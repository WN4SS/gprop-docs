# gprop documentation

The editable documentation lives in this repository's **`docs/` folder**.
Edit Markdown (`.md`) files there, not the generated HTML files at the root.
The simulator's source code lives in https://github.com/WN4SS/gprop.

## Edit on GitHub

1. Open `docs/` and select the page you want to change.
2. Click the pencil icon, edit the Markdown, and commit or open a pull request.
3. To add or reorder pages in the navigation, edit `mkdocs.yml`.

For example, edit `docs/contributing.md` for contributor information and
`docs/pipeline/prop.md` for the simulation step.

## Preview and build

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-docs.txt
mkdocs serve
```

Open the local address printed by MkDocs. To generate the static documentation:

```sh
mkdocs build --strict
```

The output is in `site/`. A Markdown edit alone does not update the deployed site.
Copy the generated contents of `site/` into the repository root before deploying,
preserving the application files:

```sh
cp -R site/. .
npm ci
npm test
npm run build
npx vercel deploy
```

Review a preview before promoting it to production. Do not use `rsync --delete`
against the repository root: that would remove the authentication application.
When removing a documentation page, also remove its corresponding generated HTML.

## Access test

The Next.js application contains the invite-only login preview. Clerk credentials
come from Vercel environment variables and must never be committed. See
[AUTH-SETUP.md](AUTH-SETUP.md) for its current scope and deployment details.
The public production site remains https://gprop-docs.vercel.app/ until the private
version is explicitly promoted.
