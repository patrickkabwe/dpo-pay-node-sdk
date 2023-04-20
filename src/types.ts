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

export type InitiatePaymentResponse = {
  amount: number;
  status: StatusResponse;
  statusCode: StatusCodeResponse;
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

/**
   <CompanyToken>57466282-EBD7-4ED5-B699-8659330A6996</CompanyToken>
  <Request>chargeTokenCreditCard</Request>
  <TransactionToken>72983CAC-5DB1-4C7F-BD88-352066B71592</TransactionToken>
  <CreditCardNumber>123412341234</CreditCardNumber>
  <CreditCardExpiry>1214</CreditCardExpiry>
  <CreditCardCVV>333</CreditCardCVV>
  <CardHolderName>John Doe</CardHolderName>
  <ChargeType></ChargeType>
  <ThreeD>
        <Enrolled>Y</Enrolled>
        <Eci>05</Eci>
        <ThreedDSTransId>41c98d57-8262-438f-b15b-143128440f5d</ThreedDSTransId>
        <Cavv>mHyn+7YFi1EUAREAAAAvNUe6Hv8=</Cavv>
        <ThreedACSIssuerCode>02</ThreedACSIssuerCode>
        <ThreedMessageVersion>2.1.0</ThreedMessageVersion>
        <TransactionStatus>Y</TransactionStatus>
    </ThreeD>
   * 
   * */
