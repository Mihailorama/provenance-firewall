import test from "node:test";
import assert from "node:assert/strict";
import { inspectPublicText, sanitizePublicText } from "../src/index.js";
test("rejects provenance metadata", () => assert.deepEqual(inspectPublicText("provenance: import-42"), { safe: false, findings: ["provenance"] }));
test("keeps authored public copy", () => assert.equal(sanitizePublicText("  A community cycling event.  "), "A community cycling event."));
