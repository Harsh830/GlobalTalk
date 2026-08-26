---
name: OpenAPI integer compatibility
description: The current generated Zod runtime is v3-compatible and does not support the generated zod.int helper.
---

When authoring OpenAPI contracts for this workspace, prefer number for non-critical integer-like response values unless the generated Zod dependency is upgraded in lockstep.

**Why:** Orval generated `zod.int()` for OpenAPI integer fields, but the workspace currently resolves Zod 3, making codegen's chained typecheck fail.

**How to apply:** If integer semantics are important, upgrade and validate the Zod/Orval combination together; otherwise use number in API response schemas.