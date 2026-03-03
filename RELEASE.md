# Release Process

This project uses **semantic-release** for fully automated releases.

---

## 🔁 What Happens on Push to `main`

When code is pushed to `main`, GitHub Actions will:

1.  Run tests
2.  Build the project
3.  Analyze commits since the last release
4.  Determine the next semantic version
5.  Update:
    - `package.json`
    - `CHANGELOG.md`
6.  Create a Git tag
7.  Publish to npm
8.  Create a GitHub Release

---

## 📦 Version Determination

Version bump is calculated from commit messages:

- `fix:` → patch
- `feat:` → minor
- `BREAKING CHANGE` or `!` → major

If no relevant commit is found, no release is created.

---

## ⚠️ Important Notes

- Never manually edit the version field in `package.json`
- Never manually create Git tags for releases
- Always use Conventional Commits

---

## 🧪 Local Development

Run tests:

npm test

Build:

npm run build

Release is handled automatically --- no manual command is required.
