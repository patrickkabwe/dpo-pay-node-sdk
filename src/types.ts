export interface DPOPaymentOptions {
  /**
   * @description The company token provided by DPO
   */
  companyToken: string;
  /**
    @description The API version to be used for the DPO API. Default is `v6`. 
    @usage `Note: currently only v6 is supported` 
    ```ts
    const dpo = new DPOPayment({
      companyToken: "your-company",
      apiVersion: "v6"
    });
    ```
  */
  apiVersion?: APIVersion;
}

export type CountryCode =
  | "ZM"
  | "KE"
  | "UG"
  | "TZ"
  | "ZW"
  | "MW"
  | "MU"
  | "NA"
  | "NG"
  | "RW"
  | "AE"
  | "ZA";
export type CountryName =
  | "botswana"
  | "uganda"
  | "tanzania"
  | "zambia"
  | "zanzibar"
  | "ghana"
  | "kenya"
  | "zimbabwe"
  | "malawi"
  | "mauritius"
  | "namibia"
  | "nigeria"
  | "rwanda"
  | "united arab emirates"
  | "south africa"
  | "ivory coast";
export type Currency = "USD" | "ZMW" | "KES" | "UGX" | "TZS";
export enum MOBILE_NETWORK_OPERATOR {
  ZAMBIA_MTN = "MTNZM",
  ZAMBIA_AIRTEL = "AirtelZM",
  RWANDA_MTN = "MTN",
  RWANDA_AIRTEL = "AirtelRW",
  MALAWI_AIRTEL = "AirtelMW",
  UGANDA_MTN = "MTNmobilemoney",
  UGANDA_AIRTEL = "Mobile_Airtel_UG",
  TANZANIA_SELCOM_ZANTEL = "Selcom_webPay_Zantel",
  TANZANIA_SELCOM_HALOTEL = "Selcom_webPay_Halotel",
  TANZANIA_TIGO = "TIGOdebitMandate",
  TANZANIA_SELCOM = "Selcom_webPay",
  TANZANIA_SELCOM_TTCL = "Selcom_webPay_TTCL",
  TANZANIA_AIRTEL = "AirtelTZ",
  GHANA_VODA = "VodaGH",
  GHANA_MTN = "MTN",
  KENYA_SAFARICOM = "SafaricomSTKv2",
  KENYA_AIRTEL = "AirtelKE",
  ZIMBABWE_ECOCASH = "EcoCash",
}

export interface Transaction {
  paymentAmount: number;
  paymentCurrency: Currency;
  companyRef: string;
  redirectURL: string;
  backURL: string;
  companyRefUnique?: string;
  /**
   * @description The Payment Time Limit for the transaction
   * @default 96 hours
   * @type {number}
   */
  ptl?: number; // default is 96 hours
  ptlType?: "hours" | "minutes";
  allowRecurrent?: 0 | 1; // 0 = false, 1 = true
  /**
   * transactionChargeType: `1 = Charge, 2 = Authorize Manual, 3 = Authorize Auto`
   */
  transactionChargeType?: 1 | 2 | 3;
  /**
   * @description The default payment country for the transaction @type {CountryName}
   * @default "zambia"
   */
  defaultPaymentCountry?: CountryName;
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

export interface TransactionInternal {
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
  DefaultPaymentCountry?: CountryName;
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
  serviceType: string | number;
  serviceDescription: string;
  serviceDate: string;
  serviceFrom?: string;
  serviceTo?: string;
}
export interface ServiceInternal {
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

export interface InitiatePaymentPayload {
  transaction: Transaction;
  services: Service[];
  additional?: Additional;
}

export interface InitiatePaymentPayloadInternal {
  Transaction: TransactionInternal;
  Services: ServiceInternal[];
  Additional?: Additional;
}

export interface ChargeMobilePayment {
  /**
   * The transaction token for the transaction
   */
  transactionToken: string;
  /**
   * The mobile number to charge
   */
  phoneNumber: string;
  /**
   * The Mobile Network Operator (MNO) for the transaction
   * @type {MOBILE_NETWORK_OPERATOR}
   */
  mno: MOBILE_NETWORK_OPERATOR;
  /**
   * The default payment country for the transaction
   * @default "zambia"
   */
  mnoCountry: CountryName;
}

export interface CheckPaymentStatus {
  transactionToken: string;
}

export interface CheckPaymentStatusInternal {
  TransactionToken: string;
}
export interface ChargeCreditCardPayment {
  transactionToken: string;
  creditCardNumber: string;
  creditCardExpiry: string;
  creditCardCVV: string;
  cardHolderName: string;
  chargeType?: string;
}
export interface ChargeCreditCardPaymentInternal {
  TransactionToken: string;
  CreditCardNumber: string;
  CreditCardExpiry: string;
  CreditCardCVV: string;
  CardHolderName: string;
  ChargeType?: string;
}

export interface CancelPayment {
  transactionToken: string;
}

export interface CancelPaymentInternal {
  TransactionToken: string;
}

export interface RefundPayment {
  transactionToken: string;
  refundAmount: number;
  refundDetails: string;
}

export interface RefundPaymentInternal {
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

export interface WebhookJSONResponse extends DPOCheckPaymentStatusResponse {}

export interface WebhookResponse {
  /**
   *  @description This is the response from the webhook in JSON format
   */
  dpoJsonResponse: WebhookJSONResponse;
  /**
   *  @description This is the response that is needed to be sent to the webhook
   */
  dpoXMLResponse: string;
}

export type DPOPayload<T> = {
  API3G: {
    CompanyToken: string;
    Request: DPO_REQUEST_TYPE;
  } & T;
};

export enum DPO_REQUEST_TYPE {
  CREATE_TOKEN = "createToken",
  REFUND_TOKEN = "refundToken",
  UPDATE_TOKEN = "updateToken",
  VERIFY_TOKEN = "verifyToken",
  CANCEL_TOKEN = "cancelToken",
  CHARGE_TOKEN_BANK_TRANSFER = "chargeTokenBankTransfer",
  CHARGE_TOKEN_CREDIT_CARD = "chargeTokenCreditCard",
  CHARGE_TOKEN_MOBILE = "chargeTokenMobile",
}

export enum PAYMENT_STRATEGY_TYPE {
  MOBILE_MONEY = "mobileMoney",
  CARD = "card",
}

export interface ChargeMobilePaymentInternal {
  TransactionToken: string;
  PhoneNumber: string;
  MNO: MOBILE_NETWORK_OPERATOR;
  MNOcountry: CountryName;
}
