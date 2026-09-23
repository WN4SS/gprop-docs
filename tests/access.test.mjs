import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isApprovedUser, resolveDoc } from '../lib/access.mjs';

const approved = ['rezoanra@buffalo.edu'];
const verified = { emailAddresses: [{ emailAddress: approved[0], verification: { status: 'verified' } }] };
test('verified, approved identity is required', () => {
  assert.equal(isApprovedUser(verified, approved), true);
  assert.equal(isApprovedUser(null, approved), false);
  assert.equal(isApprovedUser({ emailAddresses: [{ emailAddress: approved[0] }] }, approved), false);
  assert.equal(isApprovedUser(verified, ['other@example.com']), false);
  assert.equal(isApprovedUser({ ...verified, banned: true }, approved), false);
});
test('only manifest files can be served, including nested HTML and search', () => {
  const files = new Set(['index.html', 'pipeline/prop/index.html', 'search/search_index.json']);
  assert.equal(resolveDoc([], files), 'index.html');
  assert.equal(resolveDoc(['pipeline', 'prop'], files), 'pipeline/prop/index.html');
  assert.equal(resolveDoc(['search', 'search_index.json'], files), 'search/search_index.json');
  for (const input of [['..', '.env.local'], ['.env.local'], ['app', 'layout.jsx'], ['manifest.json'], ['pipeline/prop'], ['..\\.env.local']]) assert.equal(resolveDoc(input, files), null);
});
