# RawBack

RawBack helps people move from raw repository file views back to the corresponding repository file page.

## Language

**Repository Navigation Banner**:
A low-distraction tool surface shown on a raw file view whose primary purpose is navigation back to the corresponding repository file page.
_Avoid_: Marketing banner, hero banner, promotional banner

**Raw File View**:
A browser page that displays a repository file as raw content outside the repository browsing interface.
_Avoid_: Source page, preview page

**Safari Extension Onboarding Page**:
A user interface shown within the host application (both iOS and macOS) that guides the user step-by-step through the process of enabling the Safari extension.
_Avoid_: Settings screen, welcome screen

**Onboarding Step Guide**:
An ordered instructional list on the Safari Extension Onboarding Page.
_Avoid_: Progress tracker, completion checklist

**Extension Enablement Status**:
A coarse user-facing status that indicates whether RawBack is available in Safari.
_Avoid_: Per-step completion, permission progress

## Relationships

- A **Repository Navigation Banner** appears on a **Raw File View**
- A **Repository Navigation Banner** points to one repository file page
- A **Safari Extension Onboarding Page** helps the user enable the extension so that the **Repository Navigation Banner** can be injected.
- A **Safari Extension Onboarding Page** contains an **Onboarding Step Guide**.
- An **Extension Enablement Status** is separate from **Onboarding Step Guide** completion.

## Example dialogue

> **Dev:** "Should the **Repository Navigation Banner** look like a branded hero?"
> **Domain expert:** "No — it should stay low-distraction because the user is reading a **Raw File View**."

## Flagged ambiguities

- "banner" was resolved as **Repository Navigation Banner**, not a marketing or hero banner.
- "step completion" was resolved as an **Onboarding Step Guide**, not a telemetry-backed progress tracker.
