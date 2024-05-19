import { DPOResponse } from "..";

export class DPOError extends Error {
  code: number;
  response: DPOResponse;
  constructor(message: string, code = 0) {
    super(message);
    this.name = "DPOError";
    this.code = code;
    this.response = JSON.parse(message);
  }
}
