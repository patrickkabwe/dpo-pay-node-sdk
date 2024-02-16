import { axiosInstance } from "./config/axios";
import { DPOError } from "./helpers/error";
import { errorHandler } from "./helpers/errorHandler";
import { jsonToXml } from "./helpers/jsonToXml";
import { xmlResponseFormatter } from "./helpers/xmlResponseFormatter";
import type {
  APIVersion,
  CancelPaymentObject,
  ChargeCreditCardPaymentObject,
  ChargeMobilePaymentObject,
  CheckPaymentStatusObject,
  DPOPayloadObject,
  DPOPaymentOptions,
  DPOResponse,
  InitiatePaymentPayloadObject,
  PaymentStatus,
  RefundPaymentObject,
} from "./types";

export class DPOPayment {
  private companyToken: string;
  private apiVersion: APIVersion;
  private baseURL: string;

  constructor({ companyToken, apiVersion = "v6" }: DPOPaymentOptions) {
    this.companyToken = companyToken;
    this.apiVersion = apiVersion;
    this.baseURL =
      process.env.DPO_BASE_URL || "https://secure.3gdirectpay.com/API";
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
   @returns {Promise<DPOResponse>}
  */
  async initiatePayment(
    initiatePaymentObject: InitiatePaymentPayloadObject
  ): Promise<DPOResponse> {
    try {
      const objectPayload: DPOPayloadObject = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: "createToken",
          ...initiatePaymentObject,
        },
      };

      const response = await this.processPaymentResponse(objectPayload);

      return {
        ...response,
        paymentURL: `${this.baseURL}?ID=${response.transToken}`,
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
   @returns {Promise<PaymentStatus>}
  */
  checkPaymentStatus(
    checkPaymentStatusObject: CheckPaymentStatusObject
  ): Promise<PaymentStatus> {
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
      ) as Promise<PaymentStatus>;
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  parseWebhookXML(xml: string) {
    return xmlResponseFormatter(xml, false);
  }
}
