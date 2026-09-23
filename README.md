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
Copy the generated documentation into the repository root, then deploy:

```sh
cp -R site/. .
npm run build
npx vercel deploy --prod
```

The build publishes only the generated documentation. When removing a page, also
remove its corresponding generated HTML. Do not use `rsync --delete` against the
repository root, as it would remove the editable sources and configuration.

The documentation is public at https://gprop-docs.vercel.app/ and requires no login.
