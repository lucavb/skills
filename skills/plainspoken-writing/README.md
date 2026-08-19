# plainspoken-writing

## Problem

Generated prose often smooths specific facts into generic importance, adds
analysis the evidence does not support, and relies on stock vocabulary,
symmetry, formatting, and chatbot boilerplate. Replacing a few conspicuous
words only hides the symptoms.

## What it does

Runs an evidence-first editing pass that makes prose direct, specific, and
proportionate. It checks claims and citations, simplifies inflated syntax,
removes canned content and structure, and catches placeholders or
conversation residue before delivery.

The checklist is adapted from
[Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).
That page is descriptive rather than prescriptive. This skill keeps its
broadly applicable prose and source-integrity lessons; it leaves out
Wikipedia-only wikitext, templates, edit summaries, enforcement advice,
historical model artifacts, and unreliable detection indicators.

## When to install

Install when you want a deliberate final pass over drafted or revised prose.
The skill is manually invoked, so it will not alter ordinary agent responses
unless you call `plainspoken-writing`.

```bash
npx skills add lucavb/skills --skill plainspoken-writing
```

## Prerequisites

None. Source verification still requires access to any cited material.
