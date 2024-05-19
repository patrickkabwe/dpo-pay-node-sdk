import { axiosInstance } from "~/config/axios";
import { APIVersion, DPOPayload, DPOResponse } from "..";
import { DPOError } from "./error";
import { jsonToXml } from "./jsonToXml";
import { xmlResponseFormatter } from "./xmlResponseFormatter";

export async function processPaymentResponse<T>(
  objectPayload: DPOPayload<T>,
  apiVersion: APIVersion
): Promise<DPOResponse> {
  const xmlPayload = jsonToXml(objectPayload);

  const response = await axiosInstance.post(`/${apiVersion}/`, xmlPayload);

  delete response.data["?xml"];

  const fRes = xmlResponseFormatter(response.data);

  if (fRes.statusCode !== 200) {
    throw new DPOError(JSON.stringify(fRes), fRes.statusCode);
  }
  return fRes;
}
