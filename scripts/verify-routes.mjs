// Run against the retained local preview: node scripts/verify-routes.mjs
import assert from 'node:assert/strict';
const base = 'http://localhost:5173';
const paths = ['', '/about', '/program', '/team', '/trustees', '/contact'];
const results = [];
for (const lang of ['tr', 'en']) {
  for (const path of paths) {
    const response = await fetch(`${base}/${lang}${path}`);
    assert.equal(response.status, 200, `${lang}${path} status`);
    const html = await response.text();
    assert.match(html, /<h1[\s>]/, `${lang}${path} must have a primary heading`);
    assert.match(html, new RegExp(`lang="${lang}"`), `${lang}${path} language`);
    const links = [...html.matchAll(/href="(\/[^"?#]*)"/g)].map(m => m[1]).filter(url => !url.startsWith('/@') && !url.startsWith('/node_modules') && !url.startsWith('/app/'));
    assert(links.every(url => /^\/(tr|en)(\/(about|program|team|trustees|contact))?$/.test(url) || url === '/favicon.svg'), `Unexpected internal link at ${lang}${path}: ${links}`);
    results.push({ path: `/${lang}${path}`, status: response.status, heading: true });
  }
}
for (const path of ['/fr','/tr/missing']) assert.equal((await fetch(base+path)).status,404,`${path} must return 404`);
assert.equal((await fetch(base+'/favicon.svg')).status,200);
console.log(JSON.stringify({passed:true,routes:results,notFound:true,favicon:true},null,2));
