import { isAxiosError } from "axios";
import { axiosInstance } from "./config/axios";
import { DPOError } from "./helpers/error";
import { xmlResponseFormatter } from "./helpers/responseFormatter";
import { jsonToXml } from "./helpers/xmlToJson";
import type {
  CancelPaymentObject,
  ChargeCreditCardPaymentObject,
  ChargeMobilePaymentObject,
  CheckPaymentStatusObject,
  DPOPayloadObject,
  DPOPaymentOptions,
  InitiatePaymentPayloadObject,
  InitiatePaymentResponse,
  RefundPaymentObject,
} from "./types";

export class DPOPayment {
  private companyToken: string;
  private apiVersion: string;

  constructor({ companyToken, apiVersion = "/v6/" }: DPOPaymentOptions) {
    this.companyToken = companyToken;
    this.apiVersion = apiVersion;
  }

  /**
   @param {DPOPayloadObject} objectPayload
   @returns {Promise<any>}
   @throws {DPOError}
   @description This method processes a payment request to the DPO API
  */

  async processPaymentResponse(
    objectPayload: DPOPayloadObject,
    successStatus: string
  ) {
    const xmlPayload = jsonToXml(objectPayload);
    const response = await axiosInstance.post(this.apiVersion, xmlPayload);

    delete response.data["?xml"];

    const fRes = xmlResponseFormatter(response.data);

    console.log(fRes.API3G.StatusCode, Number.parseInt(successStatus));

    if (
      fRes.API3G.StatusCode !== Number.parseInt(successStatus) ||
      fRes.API3G.Result !== Number.parseInt(successStatus)
    ) {
      throw new DPOError(JSON.stringify(fRes.API3G));
    }
    return fRes.API3G;
  }

  /**
   @param {InitiatePaymentPayloadObject} paymentObject
   @returns {Promise<InitiatePaymentResponse>}
   @throws {DPOError}
   @description This method initiates a payment request to the DPO API
  */
  async initiatePayment(
    initiatePaymentObject: InitiatePaymentPayloadObject
  ): Promise<InitiatePaymentResponse> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "createToken",
          ...initiatePaymentObject,
        },
      };

      return this.processPaymentResponse(objectPayload, "0");
    } catch (error: any) {
      if (isAxiosError(error)) {
        delete error.response?.data["?xml"];
        const er = xmlResponseFormatter(error.response?.data);
        throw new DPOError(er, error.response?.status);
      }
      throw error;
    }
  }

  /**
   @param {ChargeMobilePaymentObject} chargeMobilePaymentObject
   @returns {Promise<any>}
   @throws {DPOError}
   @description This method charges a mobile payment request to the DPO API
  */
  async chargeMobilePayment(
    chargeMobilePaymentObject: ChargeMobilePaymentObject
  ): Promise<any> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "ChargeTokenMobile",
          ...chargeMobilePaymentObject,
        },
      };

      return this.processPaymentResponse(objectPayload, "130");
    } catch (error: any) {
      return error.response.data;
    }
  }

  /**
   @param {ChargeCreditCardPaymentObject} chargeCreditCardPaymentObject
   @returns {Promise<any>}
   @throws {DPOError}
   @description This method charges a credit card payment request to the DPO API
  */
  async chargeCardPayment(
    chargeCreditCardPaymentObject: ChargeCreditCardPaymentObject
  ): Promise<any> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "chargeTokenCreditCard",
          ...chargeCreditCardPaymentObject,
        },
      };

      return this.processPaymentResponse(objectPayload, "000");
    } catch (error: any) {
      return error.response.data;
    }
  }

  /**
   @param {RefundPaymentObject} refundPaymentObject
   @returns {Promise<any>}
   @throws {DPOError}
   @description This method refunds a payment request to the DPO API
  */
  async refundPayment(refundPaymentObject: RefundPaymentObject): Promise<any> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "refundToken",
          ...refundPaymentObject,
        },
      };

      return this.processPaymentResponse(objectPayload, "0");
    } catch (error: any) {
      return error.response.data;
    }
  }

  /**
   @param {CancelPaymentObject} cancelPaymentObject
   @returns {Promise<any>}
   @throws {DPOError}
   @description This method cancels a payment request to the DPO API
  */
  async cancelPayment(cancelPaymentObject: CancelPaymentObject): Promise<any> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "cancelToken",
          ...cancelPaymentObject,
        },
      };

      return this.processPaymentResponse(objectPayload, "0");
    } catch (error: any) {
      return error.response.data;
    }
  }

  /**
   @param {CheckPaymentStatusObject} checkPaymentStatusObject
   @returns {Promise<any>}
   @throws {DPOError}
   @description This method checks the status of a payment request to the DPO API
  */
  async checkPaymentStatus(
    checkPaymentStatusObject: CheckPaymentStatusObject
  ): Promise<any> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "verifyToken",
          ...checkPaymentStatusObject,
        },
      };

      return this.processPaymentResponse(objectPayload, "0");
    } catch (error: any) {
      return error.response.data;
    }
  }
}
