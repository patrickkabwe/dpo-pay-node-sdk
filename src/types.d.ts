// import { statusMap } from "./utils/statusMap";

interface DPOPaymentOptions {
  companyToken: string;
  apiVersion?: string;
}

interface Transaction {
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

interface Service {
  Service: {
    ServiceType: string;
    ServiceDescription: string;
    ServiceDate: string;
    ServiceFrom?: string;
    ServiceTo?: string;
  };
}

interface InitiatePaymentPayloadObject {
  Transaction: Transaction;
  Services: Service;
}

type StatusResponse = "success" | "failed" | "pending" | "error";
type StatusCodeResponse = 200 | 400 | 401 | 403 | 404 | 500;

type InitiatePaymentResponse = {
  amount: number;
  status: StatusResponse;
  statusCode: StatusCodeResponse;
};

type DPOPayloadObject = {
  API3G: {
    CompanyToken: string;
    Request: DPORequestType;
    [key: string]: any;
  };
};

type DPORequestType =
  | "createToken"
  | "refundToken"
  | "updateToken"
  | "verifyToken"
  | "cancelToken";
