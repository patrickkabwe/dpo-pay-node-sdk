import { isAxiosError } from "axios";
import { axiosInstance } from "./config/axios";
import { xmlResponseFormatter } from "./helpers/responseFormatter";
import { jsonToXml } from "./helpers/xmlToJson";
import type {
  DPOPayloadObject,
  DPOPaymentOptions,
  InitiatePaymentPayloadObject,
  InitiatePaymentResponse,
} from "./types";

export class DPOPayment {
  private companyToken: string;
  private apiVersion: string;

  constructor({ companyToken, apiVersion = "/v6/" }: DPOPaymentOptions) {
    this.companyToken = companyToken;
    this.apiVersion = apiVersion;
  }

  async initiatePayment(
    paymentObject: InitiatePaymentPayloadObject
  ): Promise<InitiatePaymentResponse> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "createToken",
          ...paymentObject,
        },
      };

      console.log({
        objectPayload,
      });
      // convert json to xml
      const xmlPayload = jsonToXml(objectPayload);

      // make an http request to the DPO API
      const response = await axiosInstance.post(this.apiVersion, xmlPayload);

      return xmlResponseFormatter(response.data);
    } catch (error: any) {
      console.log({
        error,
      });

      if (isAxiosError(error)) {
        return error.response?.data;
      }
      return error;
    }
  }

  // async checkPaymentStatus(paymentId: string): Promise<MakePaymentResponse> {
  //   try {
  //     const objectPayload: DPOPayloadObject = {
  //       API3G: {
  //         CompanyToken: this.companyToken,
  //         Request: "cancelToken",
  //         ...paymentObject,
  //       },
  //     };

  //     // convert json to xml
  //     const xmlPayload = jsonToXml(objectPayload);

  //     // make an http request to the DPO API
  //     const response = await axiosInstance.post(this.apiVersion, xmlPayload);
  //     return response.data;
  //   } catch (error: any) {
  //     return error.response.data;
  //   }
  // }
}
