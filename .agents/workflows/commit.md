---
description: How to write commit messages that generate good release notes
---

# Commit Message Guidelines

When making commits in this repository, always follow the Conventional Commits specification. This is essential because our GitHub Actions release workflow (`.github/workflows/publish.yml`) automatically generates release notes based on commit messages.

## Format

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

## Types

* **feat**: A new feature (will appear under "Features" in release notes and triggers a MINOR version bump if used with semantic-release)
* **fix**: A bug fix (will appear under "Bug Fixes" in release notes and triggers a PATCH version bump)
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and scripts
* **chore**: Other changes that don't modify src or test files

## Best Practices for Release Notes
1. **Be descriptive**: The description should clearly state what changed so that a user reading the release notes understands the impact.
2. **Use imperative mood**: "Add feature" not "Added feature" or "Adds feature".
3. **Reference issues**: If the commit closes an issue, include "Closes #123" in the footer.
4. **Breaking changes**: If the commit introduces a breaking change, include "BREAKING CHANGE:" in the footer or append `!` after the type/scope (e.g., `feat!: change API response format`). This triggers a MAJOR version bump.

## Example Good Commits

```
feat(api): add endpoint to fetch city holidays by IBGE code
```

```
fix(core): correctly calculate Easter date for the year 2026

Closes #42
```

```
docs: update README with Glama.ai installation instructions
```
