import type { Status } from "./types";
import type React from "react";

export function statusToCssVar(status: Status) {
  switch (status) {
    case "scheduled":
      return "var(--color-pink)";
    case "in-progress":
      return "var(--color-blue)";
    case "done":
      return "var(--color-olive)";
  }
}

export type CSSVarStyle = React.CSSProperties & {
  ["--col"]?: string;
};