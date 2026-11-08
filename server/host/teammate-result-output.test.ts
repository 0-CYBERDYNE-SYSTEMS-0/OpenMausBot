import { describe, expect, it } from "vitest";
import { teammateResultOutput } from "./teammate-result-output.ts";
import { RESULT_TRUNCATED } from "../runtime/result-truncation.ts";

describe("teammate activity output", () => {
  it("keeps a short result unchanged", () => {
    expect(teammateResultOutput(" result ")).toBe("result");
  });
  it("labels the activity excerpt and retains the runtime's data-loss notice", () => {
    const output = teammateResultOutput(`${"x".repeat(11_800)}\n\n${RESULT_TRUNCATED}`);
    expect(output.length).toBeLessThanOrEqual(2_000);
    expect(output).toContain("Activity shows an excerpt");
    expect(output).toContain(RESULT_TRUNCATED);
  });
  it("labels UI-only clipping without claiming the stored result was truncated", () => {
    const output = teammateResultOutput("x".repeat(2_001));
    expect(output.length).toBeLessThanOrEqual(2_000);
    expect(output).toContain("Activity shows an excerpt");
    expect(output).not.toContain("omitted content was not retained");
  });
});
