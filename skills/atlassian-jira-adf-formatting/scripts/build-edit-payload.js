#!/usr/bin/env node
/**
 * Build a file-backed editJiraIssue MCP payload from an ADF description doc.
 * Usage: node build-edit-payload.js <issueKey> <adf-doc.json> [--cloud-id <uuid>] [--out <path>]
 *
 * Writes JSON ready for CallMcpTool arguments (load via require(), never hand-type inline).
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const issueKey = args[0];
const adfPath = args[1];

if (!issueKey || !adfPath) {
    console.error('Usage: node build-edit-payload.js <issueKey> <adf-doc.json> [--cloud-id <uuid>] [--out <path>]');
    process.exit(1);
}

let cloudId = '81cd74fd-34d7-46ea-8689-66995d1fb2d9';
let outPath = path.join(process.cwd(), 'agent-tools', `${issueKey.toLowerCase()}-edit-payload.json`);

for (let i = 2; i < args.length; i++) {
    if (args[i] === '--cloud-id' && args[i + 1]) {
        cloudId = args[++i];
    } else if (args[i] === '--out' && args[i + 1]) {
        outPath = args[++i];
    }
}

let description;
try {
    description = JSON.parse(fs.readFileSync(adfPath, 'utf8'));
} catch (e) {
    console.error(`Cannot read ADF doc ${adfPath}:`, e.message);
    process.exit(1);
}

const payload = {
    cloudId,
    issueIdOrKey: issueKey,
    contentFormat: 'adf',
    responseContentFormat: 'markdown',
    fields: { description },
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload));
console.log('Wrote', outPath);
console.log('Size', fs.statSync(outPath).size, 'bytes');
console.log('Load with: require("' + outPath + '")');
