# Contributing

Thank you for your interest in contributing to **intl-phone-js**.

This project follows a lightweight and automated release workflow.

---

## 📌 Development Flow

This is currently a solo-maintained project.

- Work is done directly on `main`.
- Every push to `main` triggers:
  - Tests
  - Build
  - Automatic versioning
  - Automatic changelog generation
  - GitHub Release creation
  - npm publish

Releases are fully automated via **semantic-release**.

---

## 📝 Commit Convention

This project uses **Conventional Commits**.

We recommend installing the VSCode extension:

- `Conventional Commits` (vivaxy)

### Format

✨ feat(scope): short description\
🐛 fix(scope): short description\
♻️ refactor(scope): short description\
📝 docs: update readme

### Examples

✨ feat(adapter): add React adapter\
🐛 fix(engine): handle overflow validation\
💥 feat(core)!: remove deprecated API

---

## 📦 Versioning Rules

Commit Type Version Impact

---

`fix:` Patch (0.1.1 → 0.1.2)
`feat:` Minor (0.1.1 → 0.2.0)
`BREAKING CHANGE` or `!` Major

Breaking change example:

💥 feat(core)!: remove setCountry method

---

## 🚀 Releases

Releases are handled automatically by semantic-release.

- Do NOT manually edit the version in `package.json`
- Do NOT manually create Git tags
- Just commit using Conventional Commits and push
