import { RESULT_TRUNCATED } from "../runtime/result-truncation.ts";

const LIMIT = 2_000;
const EXCERPT = "[Activity shows an excerpt of the assignment result.]";

export function teammateResultOutput(result: string): string {
  const text = result.trim();
  if (text.length <= LIMIT) return text;
  const notices = [EXCERPT, ...(text.endsWith(RESULT_TRUNCATED) ? [RESULT_TRUNCATED] : [])].join("\n");
  return `${text.slice(0, LIMIT - notices.length - 2)}\n\n${notices}`;
}
