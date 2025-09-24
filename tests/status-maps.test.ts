import { describe, expect, test } from "vitest";
import { type Status, STATUS_LABEL } from "../lib/types";

const ALL: Status[] = ["scheduled", "in-progress", "done"];

describe("status maps", () => {
  test("STATUS_LABEL has entries for all Status values", () => {
    for (const s of ALL) {
      expect(STATUS_LABEL[s]).toBeTruthy();
    }
  });
});
