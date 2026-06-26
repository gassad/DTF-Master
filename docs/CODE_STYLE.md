# DTF Master Code Style

## Language Standard

DTF Master uses JavaScript ES2024. All source files must use modern language features responsibly and remain compatible with the Adobe UXP runtime targeted by the current release.

## Classes

- Use classes for services, engines, models, and controllers.
- Keep each class focused on one responsibility.
- Prefer explicit constructor dependencies.
- Avoid hidden global dependencies except inside infrastructure adapters.
- Public methods must have JSDoc.

## ES Modules

- Use ES module syntax for imports and exports.
- Prefer named exports for project classes and utilities.
- Avoid circular dependencies.
- Keep module boundaries aligned with architecture layers.

## JSDoc

JSDoc is required for exported classes, public methods, constructor dependency objects, complex return values, domain data structures, and DTOs.

JSDoc must describe intent, parameters, return values, and important side effects.

## SOLID

- Single Responsibility: each module owns one reason to change.
- Open/Closed: add new engines and services without rewriting unrelated modules.
- Liskov Substitution: compatible modules must preserve expected behavior.
- Interface Segregation: dependencies should expose only what consumers need.
- Dependency Inversion: high-level workflow code should depend on abstractions or injected collaborators.

## Clean Architecture

- UI must not call Adobe APIs directly.
- Services must isolate external systems.
- Engines must focus on DTF domain decisions and processing.
- Models must represent data and validation, not platform operations.
- Core modules orchestrate workflow and module communication.

## Clean Code

- Prefer clear names over comments that explain unclear code.
- Keep functions short and cohesive.
- Avoid large modules with unrelated responsibilities.
- Avoid boolean traps in public APIs when named options are clearer.
- Throw meaningful errors where recovery or user feedback is expected.
- Keep comments for architecture intent, integration boundaries, and non-obvious decisions.

## Naming

| Item | Convention | Example |
| --- | --- | --- |
| Classes | PascalCase | `PhotoshopDocumentService` |
| Files containing classes | PascalCase | `ArtworkProfile.js` |
| Functions and methods | camelCase | `getDocumentInfo` |
| Variables | camelCase | `activeDocument` |
| Constants | UPPER_SNAKE_CASE or exported descriptive constants | `DEFAULT_CONFIG` |
| Events | namespace:action | `document:infoLoaded` |
| CSS classes | prefixed kebab-case | `dtf-document-result` |

## Folder Structure

- `src/core`: orchestration, lifecycle, events, settings, configuration.
- `src/services`: external API adapters.
- `src/engine`: DTF processing and decision modules.
- `src/models`: domain data structures.
- `src/ui`: panel-level UI modules.
- `src/components`: shared UI primitives.
- `src/utils`: small generic utilities.
- `src/config`: defaults and static tokens.
- `tests`: automated tests.
- `docs`: technical documentation.

## Commit Convention

Use concise conventional commits:

- `feat: add document metadata service`
- `fix: handle missing active document`
- `docs: add architecture roadmap`
- `test: cover layer counting`
- `refactor: isolate event registration`
- `chore: update project metadata`

## Branch Convention

Use short branch names with a type prefix:

- `feature/photoshop-document-service`
- `fix/no-document-error`
- `docs/rfc-architecture`
- `test/document-service`
- `refactor/plugin-controller-events`

Branches should stay focused on one deliverable and should not mix unrelated changes.
