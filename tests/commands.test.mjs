import { test } from 'node:test';
import assert from 'node:assert/strict';
import { respond } from '../commands.mjs';
test('routes supported commands and the optional wake word', () => {
  assert.match(respond('Jarvis, hello').text,/Hello/);
  assert.match(respond('help').text,/no access/);
  assert.match(respond('time',new Date('2026-10-09T12:00:00Z')).text,/The time/);
  assert.match(respond('date').text,/Today/);
});
test('search preserves text safely and does not execute it', () => {
  const query='<script>alert(1)</script> & CSS';
  assert.equal(respond('search '+query).link,'https://www.google.com/search?q='+encodeURIComponent(query));
  assert.equal(respond('open my password file').link,undefined);
});
test('rejects blank, unknown and oversized commands', () => {
  assert.match(respond('').text,/Type/);
  assert.match(respond('x'.repeat(501)).text,/500/);
  assert.match(respond('delete files').text,/not supported/);
});
