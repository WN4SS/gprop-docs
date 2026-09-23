# Invite-only access test

This directory now contains a Next.js wrapper around the generated MkDocs files.
`npm run build` copies only documentation artifacts into `private-docs` and creates
a manifest. The catch-all server route checks Clerk authentication and a verified,
approved email before serving any file, including the search index and assets.
Responses are private and not cacheable. No documentation belongs in `public/`.

The test account is `rezoanra@buffalo.edu`. It was provisioned with a reserved
(unverified) email and no password; signing in requires email verification.
Clerk's allowlist is enabled. The route also enforces this address independently.
Adding another user requires updating both checks and provisioning their account.
Professor-managed invitations are not implemented yet.

Clerk was provisioned through the Vercel Marketplace. Keys are provided through
Vercel environment variables; never commit `.env.local`. This uses a development
instance for testing on a Vercel subdomain, not a production authentication setup.

The preview is https://gprop-docs-4e5yp3ux6-alvi10.vercel.app/ . Vercel deployment
protection remains enabled, so testers may also need to log into Vercel.
The production site, GitHub Pages, historical deployments and repository copies
remain public. Protecting this preview does not restrict those copies.

## Updating documentation

Build MkDocs into a separate temporary directory. Copy its generated documentation
files into this directory without deleting the Next.js application, configuration,
or dependency files. Do not run a root-level `rsync --delete` from MkDocs output.
Run `npm test` and `npm run build`, then deploy a Vercel preview. Verify login,
logout, restricted users, direct file URLs, and search before promoting.

## Verification so far

- Access and path-resolution unit tests pass; production build passes.
- Preview documentation and search-index requests without a session return 303
  to `/sign-in/` with `Cache-Control: private, no-store, max-age=0`.
- Browser renders the email sign-in form.
- Real email delivery and the complete signed-in flow await the user's code test.
