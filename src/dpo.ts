import { errorHandler } from "./helpers/errorHandler";
import {
  cancelPaymentInternalMapper,
  chargeCreditCardPaymentMapper,
  chargeMobilePaymentMapper,
  checkPaymentStatusInternalMapper,
  initiatePaymentMapper,
  refundPaymentMapper,
} from "./helpers/mappers";
import { processPaymentResponse } from "./helpers/processPaymentResponse";
import { webhookResponse } from "./helpers/xmlResponseFormatter";
import {
  APIVersion,
  CancelPayment,
  CancelPaymentInternal,
  ChargeCreditCardPayment,
  ChargeCreditCardPaymentInternal,
  ChargeMobilePayment,
  ChargeMobilePaymentInternal,
  CheckPaymentStatus,
  CheckPaymentStatusInternal,
  DPO_REQUEST_TYPE,
  DPOCheckPaymentStatusResponse,
  DPOInitiatePaymentResponse,
  DPOPayload,
  DPOPaymentOptions,
  DPOResponse,
  InitiatePaymentPayload,
  InitiatePaymentPayloadInternal,
  RefundPayment,
  RefundPaymentInternal,
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
   @description This method initiates a payment request to the DPO API
   @param {InitiatePaymentPayload} paymentObject
   @returns {Promise<DPOInitiatePaymentResponse>}
  */
  async initiatePayment(
    initiatePaymentObject: InitiatePaymentPayload
  ): Promise<DPOInitiatePaymentResponse> {
    try {
      const objectPayload: DPOPayload<InitiatePaymentPayloadInternal> = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: DPO_REQUEST_TYPE.CREATE_TOKEN,
          ...initiatePaymentMapper(initiatePaymentObject),
        },
      };

      const response = (await processPaymentResponse(
        objectPayload,
        this.apiVersion
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
   * @description This method initiates a mobile money payment request to the DPO API
   * @param objectPayload
   * @returns {Promise<DPOResponse>}
   */
  async processMobileMoneyPayment(paymentObject: ChargeMobilePayment) {
    try {
      const objectPayload: DPOPayload<ChargeMobilePaymentInternal> = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: DPO_REQUEST_TYPE.CHARGE_TOKEN_MOBILE,
          ...chargeMobilePaymentMapper(paymentObject),
        },
      };

      return processPaymentResponse(objectPayload, this.apiVersion);
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  /**
   * @description This method initiates a card payment request to the DPO API
   * @param objectPayload
   * @returns {Promise<DPOResponse>}
   */
  async processCardPayment(paymentObject: ChargeCreditCardPayment) {
    try {
      const objectPayload: DPOPayload<ChargeCreditCardPaymentInternal> = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: DPO_REQUEST_TYPE.CHARGE_TOKEN_CREDIT_CARD,
          ...chargeCreditCardPaymentMapper(paymentObject),
        },
      };

      return processPaymentResponse(objectPayload, this.apiVersion);
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  /**
   @description This method refunds a payment request to the DPO API
   @param {RefundPayment} refundPaymentObject
   @throws {DPOError}
  */
  refundPayment(refundPaymentObject: RefundPayment): Promise<DPOResponse> {
    try {
      const objectPayload: DPOPayload<RefundPaymentInternal> = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: DPO_REQUEST_TYPE.REFUND_TOKEN,
          ...refundPaymentMapper(refundPaymentObject),
        },
      };

      return processPaymentResponse(objectPayload, this.apiVersion);
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  /**
   @description This method cancels a payment request to the DPO API
   @param {CancelPayment} cancelPaymentObject
   @throws {DPOError}
  */
  cancelPayment(cancelPaymentObject: CancelPayment): Promise<DPOResponse> {
    try {
      const objectPayload: DPOPayload<CancelPaymentInternal> = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: DPO_REQUEST_TYPE.CANCEL_TOKEN,
          ...cancelPaymentInternalMapper(cancelPaymentObject),
        },
      };

      return processPaymentResponse(objectPayload, this.apiVersion);
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  /**
   @description This method checks the status of a payment request to the DPO API
   @param {CheckPaymentStatus} checkPaymentStatusObject
   @throws {DPOError}
   @returns {Promise<DPOCheckPaymentStatusResponse>}
  */
  checkPaymentStatus(
    checkPaymentStatusObject: CheckPaymentStatus
  ): Promise<DPOCheckPaymentStatusResponse> {
    try {
      const objectPayload: DPOPayload<CheckPaymentStatusInternal> = {
        API3G: {
          CompanyToken: this.companyToken,
          Request: DPO_REQUEST_TYPE.VERIFY_TOKEN,
          ...checkPaymentStatusInternalMapper(checkPaymentStatusObject),
        },
      };

      return processPaymentResponse(
        objectPayload,
        this.apiVersion
      ) as Promise<DPOCheckPaymentStatusResponse>;
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  parseWebhookXML(xml: string): WebhookResponse {
    return webhookResponse(xml);
  }
}
