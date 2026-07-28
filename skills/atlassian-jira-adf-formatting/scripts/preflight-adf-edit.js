#!/usr/bin/env node
/**
 * Preflight: ensure edited ADF is not smaller than backup (catches partial round-trips).
 * Usage: node preflight-adf-edit.js <backup-adf.json> <edited-adf.json>
 */

const fs = require('fs');

const backupPath = process.argv[2];
const editedPath = process.argv[3];

if (!backupPath || !editedPath) {
    console.error('Usage: node preflight-adf-edit.js <backup-adf.json> <edited-adf.json>');
    process.exit(1);
}

function load(p) {
    try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {
        console.error(`Invalid JSON in ${p}:`, e.message);
        process.exit(1);
    }
}

function stats(doc) {
    const textNodes = [];
    let tableRows = 0;
    let listItems = 0;

    function walk(n) {
        if (!n || typeof n !== 'object') return;
        if (n.type === 'tableRow') tableRows++;
        if (n.type === 'listItem') listItems++;
        if (typeof n.text === 'string') textNodes.push(n.text);
        if (Array.isArray(n)) n.forEach(walk);
        else Object.values(n).forEach(walk);
    }

    walk(doc);
    return { tableRows, listItems, textNodes: textNodes.length, bytes: JSON.stringify(doc).length };
}

const backup = load(backupPath);
const edited = load(editedPath);
const b = stats(backup);
const e = stats(edited);

console.log('Backup:', b);
console.log('Edited:', e);

const failures = [];
if (e.tableRows < b.tableRows) failures.push(`tableRows dropped (${b.tableRows} → ${e.tableRows})`);
if (e.listItems < b.listItems) failures.push(`listItems dropped (${b.listItems} → ${e.listItems})`);
if (e.textNodes < b.textNodes * 0.9) failures.push(`textNodes suspiciously fewer (${b.textNodes} → ${e.textNodes})`);
if (e.bytes < b.bytes * 0.5) failures.push(`payload suspiciously smaller (${b.bytes} → ${e.bytes} bytes)`);

if (failures.length) {
    console.error('\nPREFLIGHT FAILED — do not call editJiraIssue:');
    failures.forEach((f) => console.error('  -', f));
    process.exit(1);
}

console.log('\nPreflight passed.');
process.exit(0);
