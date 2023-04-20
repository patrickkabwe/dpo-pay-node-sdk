export class DPOError extends Error {
  code: number;
  constructor(message: string, code = 0) {
    super(message);
    this.name = "DPOError";
    this.code = code;
  }
}
