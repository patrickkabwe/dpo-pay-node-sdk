export interface DPOPaymentOptions {
  companyToken: string;
  apiVersion?: APIVersion;
}

export type Country = "zambia" | "kenya" | "uganda" | "tanzania";
export type Currency = "USD" | "ZMW" | "KES" | "UGX" | "TZS";

export interface Transaction {
  PaymentAmount: number;
  PaymentCurrency: Currency;
  CompanyRef: string;
  RedirectURL: string;
  BackURL: string;
  CompanyRefUnique?: string;
  PTL?: number; // default is 96 hours
  PTLtype?: "hours" | "minutes";
  AllowRecurrent?: 0 | 1; // 0 = false, 1 = true
  TransactionChargeType?: 1 | 2 | 3; // 1 = Charge, 2 = Authorize Manual, 3 = Authorize Auto
  DefaultPaymentCountry?: Country;
  customerFirstName?: string;
  customerLastName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerCity?: string;
  customerCountry?: string;
  customerZip?: string;
  emailTransaction?: 0 | 1; // 0 = false, 1 = true
}

export interface Service {
  Service: {
    ServiceType: string | number;
    ServiceDescription: string;
    ServiceDate: string;
    ServiceFrom?: string;
    ServiceTo?: string;
  };
}

export interface Additional {
  [key: string]: any;
}

export interface InitiatePaymentPayloadObject {
  Transaction: Transaction;
  Services: Service[];
  Additional?: Additional;
}

export interface ChargeMobilePaymentObject {
  TransactionToken: string;
  PhoneNumber: string;
  MNO: "MTNZM" | "AirtelZM";
  MNOcountry: Country;
}

export interface CheckPaymentStatusObject {
  TransactionToken: string;
}

export interface ChargeCreditCardPaymentObject {
  TransactionToken: string;
  CreditCardNumber: string;
  CreditCardExpiry: string;
  CreditCardCVV: string;
  CardHolderName: string;
  ChargeType?: string;
}

export interface CancelPaymentObject {
  TransactionToken: string;
}

export interface RefundPaymentObject {
  TransactionToken: string;
  refundAmount: number;
  refundDetails: string;
}

export type APIVersion = "v6";

export type StatusResponse = "success" | "failed" | "pending" | "error";
export type StatusCodeResponse = 200 | 400 | 401 | 403 | 404 | 500;

export type SuccessResponse = {
  status: StatusResponse;
  statusCode: StatusCodeResponse;
};

export type ErrorResponse = {
  status: StatusResponse;
  statusCode: StatusCodeResponse;
  message: string;
  [key: string]: any;
};

export type DPOResponse = {
  statusCode: StatusCodeResponse;
  message: string;
  [key: string]: any;
};

export interface DPOInitiatePaymentResponse extends DPOResponse {
  transToken: string;
  transRef: string;
  statusCode: StatusCodeResponse;
  message: string;
  paymentURL: string;
}

export interface DPOCheckPaymentStatusResponse extends DPOResponse {
  customerName: string;
  customerCredit: string;
  customerCreditType: string;
  transactionApproval: string;
  transactionCurrency: string;
  transactionAmount: number;
  fraudAlert: number;
  fraudExplnation: string;
  transactionNetAmount: number;
  transactionSettlementDate: string;
  transactionRollingReserveAmount: number;
  transactionRollingReserveDate: string;
  customerPhone: string;
  customerCountry: string;
  customerAddress: string;
  customerCity: string;
  customerZip: string;
  mobilePaymentRequest: string;
  accRef: string;
  transactionFinalCurrency: string;
  transactionFinalAmount: number;
  statusCode: StatusCodeResponse;
  message: string;
}

export interface WebhookResponse {
  /**
   *  @description This is the response from the webhook in JSON format
   */
  dpoJsonResponse: any;
  /**
   *  @description This is the response from the webhook in XML format
   */
  dpoXMLResponse: string;
}

export type DPOPayloadObject = {
  API3G: {
    CompanyToken: string;
    Request: DPORequestType;
    [key: string]: any;
  };
};

export type DPORequestType =
  | "createToken"
  | "refundToken"
  | "updateToken"
  | "verifyToken"
  | "cancelToken"
  | "chargeTokenBankTransfer"
  | "chargeTokenCreditCard"
  | "chargeTokenMobile";
