import { isAxiosError } from "axios";
import { DPOError } from "./error";
import { xmlResponseFormatter } from "./xmlResponseFormatter";

export const errorHandler = (error: any): any => {
  if (isAxiosError(error)) {
    delete error.response?.data["?xml"];
    const er = xmlResponseFormatter(error.response?.data);
    throw new DPOError(er as any, error.response?.status);
  }
  throw error;
};
