import { axiosInstance } from "./config/axios";
import { DPOError } from "./helpers/error";
import { errorFormatter } from "./helpers/errorFormatter";
import { jsonToXml } from "./helpers/jsonToXml";
import { xmlResponseFormatter } from "./helpers/responseFormatter";
import type {
  CancelPaymentObject,
  ChargeCreditCardPaymentObject,
  ChargeMobilePaymentObject,
  CheckPaymentStatusObject,
  DPOPayloadObject,
  DPOPaymentOptions,
  InitiatePaymentPayloadObject,
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
  This method processes a payment request to the DPO API
  */
  async processPaymentResponse(objectPayload: DPOPayloadObject) {
    const xmlPayload = jsonToXml(objectPayload);
    const response = await axiosInstance.post(this.apiVersion, xmlPayload);

    delete response.data["?xml"];

    const fRes = xmlResponseFormatter(response.data);

    if (fRes.statusCode !== 200) {
      throw new DPOError(JSON.stringify(fRes));
    }
    return fRes;
  }

  /**
   @param {InitiatePaymentPayloadObject} paymentObject
   @throws {DPOError}
   @description This method initiates a payment request to the DPO API
  */
  async initiatePayment(initiatePaymentObject: InitiatePaymentPayloadObject) {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "createToken",
          ...initiatePaymentObject,
        },
      };

      return this.processPaymentResponse(objectPayload);
    } catch (error: any) {
      return errorFormatter(error);
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

      return this.processPaymentResponse(objectPayload);
    } catch (error: any) {
      return errorFormatter(error);
    }
  }

  /**
   @param {ChargeCreditCardPaymentObject} chargeCreditCardPaymentObject
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

      return this.processPaymentResponse(objectPayload);
    } catch (error: any) {
      return errorFormatter(error);
    }
  }

  /**
   @param {RefundPaymentObject} refundPaymentObject
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

      return this.processPaymentResponse(objectPayload);
    } catch (error: any) {
      return errorFormatter(error);
    }
  }

  /**
   @param {CancelPaymentObject} cancelPaymentObject
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

      return this.processPaymentResponse(objectPayload);
    } catch (error: any) {
      return errorFormatter(error);
    }
  }

  /**
   @param {CheckPaymentStatusObject} checkPaymentStatusObject
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

      return this.processPaymentResponse(objectPayload);
    } catch (error: any) {
      return errorFormatter(error);
    }
  }

  parseWebhookXML(xml: string) {
    return xmlResponseFormatter(xml, false);
  }
}
