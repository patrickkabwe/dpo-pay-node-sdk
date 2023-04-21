export interface DPOPaymentOptions {
  companyToken: string;
  apiVersion?: string;
}

export interface Transaction {
  PaymentAmount: number;
  PaymentCurrency: string;
  CompanyRef: string;
  RedirectURL: string;
  BackURL: string;
  CompanyRefUnique?: string;
  PTL?: number; // default is 96 hours
  PTLtype?: "hours" | "minutes";
  TransactionChargeType?: 1 | 2 | 3; // 1 = Charge, 2 = Authorize Manual, 3 = Authorize Auto
  customerFirstName?: string;
  customerLastName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerCity?: string;
  customerCountry?: string;
  customerZip?: string;
  EmailTransaction?: 0 | 1; // 0 = false, 1 = true
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

export interface InitiatePaymentPayloadObject {
  Transaction: Transaction;
  Services: Service[];
}

export interface ChargeMobilePaymentObject {
  TransactionToken: string;
  PhoneNumber: string;
  MNO: "MTNZM" | "AirtelZM";
  MNOcountry: "zambia";
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

export type StatusResponse = "success" | "failed" | "pending" | "error";
export type StatusCodeResponse = 200 | 400 | 401 | 403 | 404 | 500;

export type DPOResponse = {
  statusCode: StatusCodeResponse;
  message: string;
  [key: string]: any;
};

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
  | "ChargeTokenMobile";
