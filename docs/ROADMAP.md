# DTF Master Roadmap

## 0.1 Foundation

### Objectives
Create the baseline project structure, UXP manifest, core services, UI shell, documentation, and empty processing contracts.

### Features
- Adobe UXP project structure.
- Plugin manifest for Photoshop.
- Initial panel UI.
- Logger, configuration manager, event bus, settings service.
- Empty engine classes.

### Completion Criteria
- Project loads in Adobe UXP Developer Tool.
- Main panel renders in Photoshop.
- Required folders and baseline files exist.
- Core modules import without runtime errors.

## 0.2 Photoshop Integration

### Objectives
Create reliable read-only integration with Photoshop document metadata.

### Features
- Active document access through Adobe UXP.
- Read-only document information service.
- Document metadata display in the UI.
- Error handling when no document is open.
- Tests using mocked Photoshop API data.

### Completion Criteria
- The plugin reads file name, canvas size, DPI, color mode, bit depth, and layer count.
- No document modifications occur.
- UI reports clear errors for unavailable documents.
- Service behavior is covered by automated tests.

## 0.3 DTF Vision

### Objectives
Introduce artwork inspection and profile generation without destructive edits.

### Features
- ArtworkProfile population from document data.
- Transparency classification.
- Basic visual feature detection contracts.
- Detail level and print readiness scoring model.

### Completion Criteria
- ArtworkProfile is generated from an active document.
- Analysis results are repeatable for the same document.
- No processing engine modifies the Photoshop document.
- DTF Vision outputs documented fields for later engines.

## 0.4 White Ink Engine

### Objectives
Design and implement white ink recommendation and generation workflows.

### Features
- White base expansion recommendations.
- Underbase strategy selection.
- Non-destructive layer generation strategy.
- User-configurable white ink settings.

### Completion Criteria
- White ink recommendations are derived from ArtworkProfile.
- Generated output is separated from original artwork.
- User can preview and confirm white ink behavior.
- Tests cover decision rules and edge cases.

## 0.5 Halftone Engine

### Objectives
Implement halftone recommendation and generation logic for DTF output.

### Features
- Recommended LPI selection.
- Dot pattern strategy contracts.
- Angle and density settings.
- Compatibility checks with white ink output.

### Completion Criteria
- Halftone parameters are derived from artwork characteristics.
- Engine output is deterministic for fixed inputs.
- UI exposes relevant settings without clutter.
- Tests validate recommendation rules.

## 0.6 Preview Engine

### Objectives
Provide a visual preview layer for DTF processing decisions before export.

### Features
- Preview composition pipeline.
- Toggleable previews for white ink, halftone, trap, and sharpening.
- Non-destructive preview state.
- Clear status and warning messages.

### Completion Criteria
- Preview does not alter original layers permanently.
- User can compare source and processed states.
- Preview state can be reset safely.
- Performance remains acceptable for production-sized artwork.

## 0.7 Export Engine

### Objectives
Create reliable export workflows for production-ready files.

### Features
- Export settings model.
- Output format selection.
- Naming conventions.
- Pre-export validation.
- Export summary reporting.

### Completion Criteria
- Export produces expected output files.
- Invalid configurations are blocked with clear messages.
- Export does not corrupt or overwrite source documents unexpectedly.
- Tests cover naming and validation rules.

## 0.8 Batch Processing

### Objectives
Support repeated DTF preparation workflows across multiple files.

### Features
- Batch job model.
- Queue management.
- Per-file status reporting.
- Error isolation between files.
- Reusable presets.

### Completion Criteria
- Multiple files can be processed in sequence.
- One failed file does not stop the whole batch unless configured.
- Results and errors are summarized clearly.
- Batch presets are saved and loaded reliably.

## 0.9 Beta

### Objectives
Prepare DTF Master for controlled production testing.

### Features
- Complete user workflow from document inspection to export.
- Stability hardening.
- UX polish.
- Expanded test coverage.
- Installer and packaging validation.

### Completion Criteria
- Beta users can complete the primary workflow.
- Known limitations are documented.
- Critical defects are resolved or explicitly deferred.
- Plugin packaging is repeatable.

## 1.0 Stable Release

### Objectives
Release a stable professional version for production DTF workflows.

### Features
- Finalized core workflow.
- Stable engine behavior.
- Complete documentation.
- Release notes.
- Support and maintenance process.

### Completion Criteria
- No known critical defects remain.
- Documentation matches actual behavior.
- Exported outputs meet defined production criteria.
- Version is ready for long-term maintenance.
