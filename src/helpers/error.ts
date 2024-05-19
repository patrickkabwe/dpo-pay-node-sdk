import { DPOResponse } from "..";

export class DPOError extends Error {
  code: number;
  response: DPOResponse;
  constructor(message: string, code = 0, response: DPOResponse) {
    super(message);
    this.name = "DPOError";
    this.code = code;
    this.response = response;
  }
}
