#!/usr/bin/env node
/**
 * Validates a Jira ADF document file for story-table editing.
 * Usage: node validate-adf.js path/to/description.json
 */

const fs = require('fs');
const path = process.argv[2];

if (!path) {
  console.error('Usage: node validate-adf.js <adf-doc.json>');
  process.exit(1);
}

let doc;
try {
  doc = JSON.parse(fs.readFileSync(path, 'utf8'));
} catch (e) {
  console.error('Invalid JSON:', e.message);
  process.exit(1);
}

const errors = [];
const warnings = [];

function check(node, trail) {
  if (!node || typeof node !== 'object') {
    errors.push(`${trail}: not an object`);
    return;
  }
  if (!node.type) {
    errors.push(`${trail}: missing "type"`);
    return;
  }

  if (node.type === 'doc') {
    if (node.version !== 1) warnings.push(`${trail}: expected version 1`);
    if (!Array.isArray(node.content) || node.content.length === 0) {
      errors.push(`${trail}: doc must have non-empty content array`);
    }
    node.content?.forEach((c, i) => check(c, `${trail}.content[${i}]`));
  }

  if (node.type === 'table') {
    if (!Array.isArray(node.content) || node.content.length === 0) {
      errors.push(`${trail}: table must have rows`);
    }
    node.content?.forEach((c, i) => check(c, `${trail}.content[${i}]`));
  }

  if (node.type === 'tableRow') {
    node.content?.forEach((c, i) => check(c, `${trail}.content[${i}]`));
  }

  if (node.type === 'tableCell' || node.type === 'tableHeader') {
    node.content?.forEach((c, i) => check(c, `${trail}.content[${i}]`));
  }

  if (node.type === 'bulletList') {
    if (!Array.isArray(node.content) || node.content.length === 0) {
      errors.push(`${trail}: bulletList must have at least one listItem`);
    }
    node.content?.forEach((c, i) => check(c, `${trail}.content[${i}]`));
  }

  if (node.type === 'listItem') {
    if (!Array.isArray(node.content) || node.content.length === 0) {
      errors.push(`${trail}: listItem must have content`);
    }
    node.content?.forEach((c, i) => check(c, `${trail}.content[${i}]`));
  }

  if (node.type === 'paragraph') {
    const text = (node.content || [])
      .filter((n) => n.type === 'text')
      .map((n) => n.text)
      .join('');
    if (text.includes('<br>-')) {
      warnings.push(`${trail}: contains "<br>-" — likely single flattened bullet`);
    }
    if (text.trim() === '-') {
      warnings.push(`${trail}: lone "-" — use empty paragraph for empty cells`);
    }
    node.content?.forEach((c, i) => check(c, `${trail}.content[${i}]`));
  }
}

check(doc, 'doc');

// Report list counts in table cells (second column)
const table = doc.content?.find((n) => n.type === 'table');
if (table) {
  for (const row of table.content || []) {
    const cells = row.content || [];
    if (cells.length < 2) continue;
    const label = cells[0]?.content?.[0]?.content?.[0]?.text || '?';
    const right = cells[1]?.content?.[0];
    if (right?.type === 'bulletList') {
      console.log(`  ${label}: ${right.content.length} listItem(s)`);
    } else if (right?.type === 'paragraph' && !right.content?.length) {
      console.log(`  ${label}: empty`);
    } else if (right?.type === 'paragraph') {
      console.log(`  ${label}: paragraph (no bulletList)`);
    }
  }
}

if (warnings.length) {
  console.warn('\nWarnings:');
  warnings.forEach((w) => console.warn('  -', w));
}

if (errors.length) {
  console.error('\nErrors:');
  errors.forEach((e) => console.error('  -', e));
  process.exit(1);
}

console.log('\nADF document is valid.');
process.exit(0);
