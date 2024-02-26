interface DPOPaymentOptions {
    companyToken: string;
    apiVersion?: APIVersion;
}
type Country = "ZM" | "KE" | "UG" | "TZ";
type Currency = "USD" | "ZMW" | "KES" | "UGX" | "TZS";
interface Transaction {
    PaymentAmount: number;
    PaymentCurrency: Currency;
    CompanyRef: string;
    RedirectURL: string;
    BackURL: string;
    CompanyRefUnique?: string;
    PTL?: number;
    PTLtype?: "hours" | "minutes";
    AllowRecurrent?: 0 | 1;
    TransactionChargeType?: 1 | 2 | 3;
    DefaultPaymentCountry?: Country;
    customerFirstName?: string;
    customerLastName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerAddress?: string;
    customerCity?: string;
    customerCountry?: string;
    customerZip?: string;
    emailTransaction?: 0 | 1;
}
interface Service {
    Service: {
        ServiceType: string | number;
        ServiceDescription: string;
        ServiceDate: string;
        ServiceFrom?: string;
        ServiceTo?: string;
    };
}
interface Additional {
    [key: string]: any;
}
interface InitiatePaymentPayloadObject {
    Transaction: Transaction;
    Services: Service[];
    Additional?: Additional;
}
interface ChargeMobilePaymentObject {
    TransactionToken: string;
    PhoneNumber: string;
    MNO: "MTNZM" | "AirtelZM";
    MNOcountry: Country;
}
interface CheckPaymentStatusObject {
    TransactionToken: string;
}
interface ChargeCreditCardPaymentObject {
    TransactionToken: string;
    CreditCardNumber: string;
    CreditCardExpiry: string;
    CreditCardCVV: string;
    CardHolderName: string;
    ChargeType?: string;
}
interface CancelPaymentObject {
    TransactionToken: string;
}
interface RefundPaymentObject {
    TransactionToken: string;
    refundAmount: number;
    refundDetails: string;
}
type APIVersion = "v6";
type StatusResponse = "success" | "failed" | "pending" | "error";
type StatusCodeResponse = 200 | 400 | 401 | 403 | 404 | 500;
type SuccessResponse = {
    status: StatusResponse;
    statusCode: StatusCodeResponse;
};
type ErrorResponse = {
    status: StatusResponse;
    statusCode: StatusCodeResponse;
    message: string;
    [key: string]: any;
};
type DPOResponse = {
    statusCode: StatusCodeResponse;
    message: string;
    [key: string]: any;
};
interface DPOInitiatePaymentResponse extends DPOResponse {
    transToken: string;
    transRef: string;
    statusCode: StatusCodeResponse;
    message: string;
    paymentURL: string;
}
interface DPOCheckPaymentStatusResponse extends DPOResponse {
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
interface WebhookJSONResponse extends DPOCheckPaymentStatusResponse {
}
interface WebhookResponse {
    dpoJsonResponse: WebhookJSONResponse;
    dpoXMLResponse: string;
}
type DPOPayloadObject = {
    API3G: {
        CompanyToken: string;
        Request: DPORequestType;
        [key: string]: any;
    };
};
type DPORequestType = "createToken" | "refundToken" | "updateToken" | "verifyToken" | "cancelToken" | "chargeTokenBankTransfer" | "chargeTokenCreditCard" | "chargeTokenMobile";

declare class DPOPayment {
    private companyToken;
    private apiVersion;
    private paymentURL;
    constructor({ companyToken, apiVersion }: DPOPaymentOptions);
    processPaymentResponse(objectPayload: DPOPayloadObject): Promise<DPOResponse>;
    initiatePayment(initiatePaymentObject: InitiatePaymentPayloadObject): Promise<DPOInitiatePaymentResponse>;
    chargeMobilePayment(chargeMobilePaymentObject: ChargeMobilePaymentObject): Promise<DPOResponse>;
    chargeCardPayment(chargeCreditCardPaymentObject: ChargeCreditCardPaymentObject): Promise<DPOResponse>;
    refundPayment(refundPaymentObject: RefundPaymentObject): Promise<DPOResponse>;
    cancelPayment(cancelPaymentObject: CancelPaymentObject): Promise<DPOResponse>;
    checkPaymentStatus(checkPaymentStatusObject: CheckPaymentStatusObject): Promise<DPOCheckPaymentStatusResponse>;
    parseWebhookXML(xml: string): WebhookResponse;
}

export { type APIVersion, type Additional, type CancelPaymentObject, type ChargeCreditCardPaymentObject, type ChargeMobilePaymentObject, type CheckPaymentStatusObject, type Country, type Currency, type DPOCheckPaymentStatusResponse, type DPOInitiatePaymentResponse, type DPOPayloadObject, DPOPayment, type DPOPaymentOptions, type DPORequestType, type DPOResponse, type ErrorResponse, type InitiatePaymentPayloadObject, type RefundPaymentObject, type Service, type StatusCodeResponse, type StatusResponse, type SuccessResponse, type Transaction, type WebhookJSONResponse, type WebhookResponse };
