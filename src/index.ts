import { axiosInstance } from "./config/axios";
import { jsonToXml } from "./helpers/xmlToJson";

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
          Request: "cancelToken",
          ...paymentObject,
        },
      };

      // convert json to xml
      const xmlPayload = jsonToXml(objectPayload);

      // make an http request to the DPO API
      const response = await axiosInstance.post(this.apiVersion, xmlPayload);
      return response.data;
    } catch (error: any) {
      return error.response.data;
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
