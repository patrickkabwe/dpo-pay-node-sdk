import { axiosInstance } from "./config/axios";
import { DPOError } from "./helpers/error";
import { errorHandler } from "./helpers/errorHandler";
import { jsonToXml } from "./helpers/jsonToXml";
import {
  webhookResponse,
  xmlResponseFormatter,
} from "./helpers/xmlResponseFormatter";
import type {
  APIVersion,
  CancelPaymentObject,
  ChargeCreditCardPaymentObject,
  ChargeMobilePaymentObject,
  CheckPaymentStatusObject,
  DPOCheckPaymentStatusResponse,
  DPOInitiatePaymentResponse,
  DPOPayloadObject,
  DPOPaymentOptions,
  DPOResponse,
  InitiatePaymentPayloadObject,
  RefundPaymentObject,
  WebhookResponse,
} from "./types";

export class DPOPayment {
  private companyToken: string;
  private apiVersion: APIVersion;
  private paymentURL: string;

  constructor({ companyToken, apiVersion = "v6" }: DPOPaymentOptions) {
    this.companyToken = companyToken;
    this.apiVersion = apiVersion;
    this.paymentURL =
      process.env.DPO_PAYMENT_URL || "https://secure.3gdirectpay.com/payv3.php";
  }

  /**
  This method processes a payment request to the DPO API
  */
  async processPaymentResponse(objectPayload: DPOPayloadObject) {
    const xmlPayload = jsonToXml(objectPayload);

    const response = await axiosInstance.post(
      `/${this.apiVersion}/`,
      xmlPayload
    );

    delete response.data["?xml"];

    const fRes = xmlResponseFormatter(response.data);

    if (fRes.statusCode !== 200) {
      throw new DPOError(JSON.stringify(fRes), fRes.statusCode);
    }
    return fRes;
  }

  /**
   @description This method initiates a payment request to the DPO API
   @param {InitiatePaymentPayloadObject} paymentObject
   @throws {DPOError}
   @returns {Promise<DPOInitiatePaymentResponse>}
  */
  async initiatePayment(
    initiatePaymentObject: InitiatePaymentPayloadObject
  ): Promise<DPOInitiatePaymentResponse> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "createToken",
          ...initiatePaymentObject,
        },
      };

      const response = (await this.processPaymentResponse(
        objectPayload
      )) as DPOInitiatePaymentResponse;

      return {
        ...response,
        paymentURL: `${this.paymentURL}?ID=${response.transToken}`,
      };
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  /**
   @description This method charges a mobile payment request to the DPO API
   @param {ChargeMobilePaymentObject} chargeMobilePaymentObject
   @returns {Promise<DPOResponse>}
   @throws {DPOError}
  */
  chargeMobilePayment(
    chargeMobilePaymentObject: ChargeMobilePaymentObject
  ): Promise<DPOResponse> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "chargeTokenMobile",
          ...chargeMobilePaymentObject,
        },
      };

      return this.processPaymentResponse(objectPayload);
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  /**
   @description This method charges a credit card payment request to the DPO API
   @param {ChargeCreditCardPaymentObject} chargeCreditCardPaymentObject
   @throws {DPOError}
  */
  chargeCardPayment(
    chargeCreditCardPaymentObject: ChargeCreditCardPaymentObject
  ): Promise<DPOResponse> {
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
      return errorHandler(error);
    }
  }

  /**
   @description This method refunds a payment request to the DPO API
   @param {RefundPaymentObject} refundPaymentObject
   @throws {DPOError}
  */
  refundPayment(
    refundPaymentObject: RefundPaymentObject
  ): Promise<DPOResponse> {
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
      return errorHandler(error);
    }
  }

  /**
   @description This method cancels a payment request to the DPO API
   @param {CancelPaymentObject} cancelPaymentObject
   @throws {DPOError}
  */
  cancelPayment(
    cancelPaymentObject: CancelPaymentObject
  ): Promise<DPOResponse> {
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
      return errorHandler(error);
    }
  }

  /**
   @description This method checks the status of a payment request to the DPO API
   @param {CheckPaymentStatusObject} checkPaymentStatusObject
   @throws {DPOError}
   @returns {Promise<DPOCheckPaymentStatusResponse>}
  */
  checkPaymentStatus(
    checkPaymentStatusObject: CheckPaymentStatusObject
  ): Promise<DPOCheckPaymentStatusResponse> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "verifyToken",
          ...checkPaymentStatusObject,
        },
      };

      return this.processPaymentResponse(
        objectPayload
      ) as Promise<DPOCheckPaymentStatusResponse>;
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  parseWebhookXML(xml: string): WebhookResponse {
    return webhookResponse(xml);
  }
}
