import { auth, clerkClient } from '@clerk/nextjs/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isApprovedUser, resolveDoc } from '../../lib/access.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
const privateHeaders = { 'Cache-Control': 'private, no-store, max-age=0', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', 'Vary': 'Cookie' };
const approvedEmails = ['rezoanra@buffalo.edu'];
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.map': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.xml': 'application/xml', '.gz': 'application/gzip', '.woff': 'font/woff', '.woff2': 'font/woff2' };

export async function GET(request, context) {
  const { userId } = await auth();
  if (!userId) return new Response(null, { status: 303, headers: { ...privateHeaders, Location: '/sign-in/' } });
  let user;
  try { user = await (await clerkClient()).users.getUser(userId); }
  catch { return new Response('Access verification unavailable. Please try again.', { status: 503, headers: privateHeaders }); }
  if (!isApprovedUser(user, approvedEmails)) return new Response('This account is not approved for the documentation.', { status: 403, headers: privateHeaders });

  const root = path.join(process.cwd(), 'private-docs');
  const manifest = new Set(JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8')));
  const parts = (await context.params).path || [];
  const name = resolveDoc(parts, manifest);
  if (!name) return new Response('Not found', { status: 404, headers: privateHeaders });
  let body = await readFile(path.join(root, name));
  if (name.endsWith('.html')) {
    body = body.toString('utf8').replace('</body>', '<a href="/account/" style="position:fixed;bottom:12px;right:16px;z-index:99;padding:8px 12px;background:#126b65;color:white;border-radius:6px;font:14px system-ui">Account / sign out</a></body>');
  }
  return new Response(body, { headers: { ...privateHeaders, 'Content-Type': mime[path.extname(name)] || 'application/octet-stream' } });
}
