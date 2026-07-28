# GitHub PR review — posting mechanics

**Single source of truth** for leaving a multi-comment review via `gh`. Prefer this over inventing shapes from memory.

## Mental model

1. Create a **pending** review (optionally with the first inline comment).
2. Add further inline threads to that pending review.
3. **Submit** with `COMMENT` or `REQUEST_CHANGES` (and optional summary body).

One pending review per user per PR. Delete or submit before starting another.

Get head SHA once:

```bash
gh pr view {pr} --repo {owner}/{repo} --json headRefOid -q .headRefOid
```

## Constraint: line must be in the diff

Inline comments only attach to lines that appear in the PR diff (added or context in a hunk). Unchanged lines outside hunks → GraphQL returns `thread: null`.

Before posting, confirm the line is in:

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/files \
  --jq '.[] | select(.filename=="{path}") | .patch'
```

If the natural anchor is unchanged, pick a nearby **changed** line that still makes the comment clear.

## Create pending review (+ first comment)

Use a real JSON array via `--input`. Do **not** use `-f 'comments[0][path]=…'` (that is not an array).

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/reviews --method POST --input - <<'EOF'
{
  "commit_id": "{head_sha}",
  "comments": [
    {
      "path": "src/example.ts",
      "line": 301,
      "side": "RIGHT",
      "body": "First finding…"
    }
  ]
}
EOF
```

Omit `event` → state `PENDING`. Save `id` and `node_id` (GraphQL id, e.g. `PRR_…`).

Empty pending (no comments yet):

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/reviews --method POST -f commit_id='{head_sha}'
```

Delete a pending review:

```bash
gh api -X DELETE repos/{owner}/{repo}/pulls/{pr}/reviews/{review_id}
```

## Add comments to the pending review (GraphQL)

REST `POST .../pulls/{pr}/comments` with `line` is brittle across API versions / pending-review states. Reliable path: **GraphQL** `addPullRequestReviewThread` on the pending review's `node_id`.

```bash
gh api graphql -f query='
mutation($reviewId: ID!, $body: String!, $path: String!, $line: Int!) {
  addPullRequestReviewThread(input: {
    pullRequestReviewId: $reviewId
    body: $body
    path: $path
    line: $line
    side: RIGHT
  }) {
    thread {
      comments(first: 1) {
        nodes { url databaseId path }
      }
    }
  }
}' \
  -f reviewId='{node_id}' \
  -f path='src/example.ts' \
  -F line=305 \
  -f body='Finding text…'
```

Use `-F line=` (integer), not `-f line=` (string).

Success → `nodes[0].url` (discussion URL). Failure often looks like `"thread": null` (line not in diff).

## Submit the pending review

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/reviews/{review_id}/events \
  --method POST --input - <<'EOF'
{
  "event": "COMMENT",
  "body": "Optional summary for the review as a whole."
}
EOF
```

`event`: `COMMENT` | `REQUEST_CHANGES` | `APPROVE`.

## Interactive walkthrough (post / continue)

For each finding:

1. Explain (2–4 sentences).
2. Show the comment in a blockquote.
3. Wait for **post** or **continue**.
4. On post → add thread → paste discussion URL → next finding immediately.
5. On continue → acknowledge once → next finding (no re-litigation).

After the last finding, offer the summary body, then submit.

## Tone

- Problem before fix; one concern per comment.
- Nits start with `Nit:`.
- No preamble (“I noticed that…”).

## Anti-patterns

- Posting with form-encoded `comments[0][…]` instead of a JSON array.
- Commenting a line outside the diff.
- Starting a second pending review while one is open.
- Treating `gh pr review` as sufficient for multi-inline reviews (it is not).
