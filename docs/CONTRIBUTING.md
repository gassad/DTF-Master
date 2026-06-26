# Contributing to DTF Master

## Project Setup

1. Install a supported version of Node.js.
2. Install Adobe Photoshop with UXP support.
3. Install Adobe UXP Developer Tool.
4. Load the project folder in Adobe UXP Developer Tool.
5. Run the DTF Master panel inside Photoshop.
6. Run available automated tests before opening a pull request.

## Creating a Feature

A feature must be planned around one user-facing or architecture-facing outcome.

Feature checklist:

- Create or reference a roadmap item.
- Identify the affected layer: UI, core, service, engine, model, or documentation.
- Keep the branch focused on the feature.
- Add tests for new behavior.
- Update documentation when workflow, architecture, or public contracts change.
- Avoid unrelated refactors.

## Creating an Engine

Engines live in `src/engine` and own DTF domain processing or decisions.

Engine checklist:

- Create one class per engine.
- Define input and output contracts before implementation.
- Use domain models or plain data objects as inputs.
- Avoid direct UI access.
- Avoid direct Photoshop API access unless a service adapter is injected.
- Add tests for recommendations, edge cases, and error states.
- Document public methods with JSDoc.

## Opening Pull Requests

Pull requests must be small enough to review safely.

A pull request should include:

- Clear title using the commit convention style.
- Summary of what changed.
- Testing performed.
- Screenshots or notes for UI changes.
- Documentation updates when relevant.
- Explicit mention of any known limitations.

Review expectations:

- Architecture boundaries are respected.
- No unrelated files are modified.
- Public APIs have JSDoc.
- Tests are meaningful and pass locally.
- Photoshop integration remains safe and predictable.

## Documenting Code

Documentation should explain intent and contracts, not restate obvious implementation details.

Document:

- Exported classes.
- Public methods.
- Constructor dependency objects.
- External API boundaries.
- Domain model fields.
- Non-obvious decisions.
- Error behavior.

Avoid comments that merely repeat the code.

## Writing Tests

Tests should focus on behavior and contracts.

Testing guidelines:

- Test services with mocked external APIs.
- Test engines with deterministic sample inputs.
- Test models for serialization, reset behavior, and validation.
- Test event-driven flows through observable outputs.
- Avoid relying on a live Photoshop document for automated unit tests.
- Keep fixtures small and focused.

## Branch and Commit Hygiene

Use focused branches and conventional commits. Do not mix formatting, feature work, documentation, and refactors in one change unless the pull request explicitly requires it.

Examples:

- `feature/dtf-vision-profile`
- `docs/plugin-flow`
- `test/photoshop-document-service`
- `fix/no-active-document-message`
