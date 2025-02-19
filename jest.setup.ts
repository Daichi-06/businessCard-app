import "@testing-library/jest-dom";
import { config } from "dotenv";
import { TextEncoder } from "util";

config();

// structuredCloneのポリフィル
if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (obj) => {
    if (obj === undefined) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(obj));
  };
}

global.TextEncoder = TextEncoder;
