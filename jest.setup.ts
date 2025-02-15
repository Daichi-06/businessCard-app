import "@testing-library/jest-dom";
import { config } from "dotenv";

config();

// structuredCloneのポリフィル
if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
