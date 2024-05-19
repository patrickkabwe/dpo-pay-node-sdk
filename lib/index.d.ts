interface DPOPaymentOptions {
    companyToken: string;
    apiVersion?: APIVersion;
}
type CountryCode = "ZM" | "KE" | "UG" | "TZ" | "ZW" | "MW" | "MU" | "NA" | "NG" | "RW" | "AE" | "ZA";
type CountryName = "botswana" | "uganda" | "tanzania" | "zambia" | "zanzibar" | "ghana" | "kenya" | "zimbabwe" | "malawi" | "mauritius" | "namibia" | "nigeria" | "rwanda" | "united arab emirates" | "south africa" | "ivory coast";
type Currency = "USD" | "ZMW" | "KES" | "UGX" | "TZS";
declare enum MOBILE_NETWORK_OPERATOR {
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
    ZIMBABWE_ECOCASH = "EcoCash"
}
interface Transaction {
    paymentAmount: number;
    paymentCurrency: Currency;
    companyRef: string;
    redirectURL: string;
    backURL: string;
    companyRefUnique?: string;
    ptl?: number;
    ptlType?: "hours" | "minutes";
    allowRecurrent?: 0 | 1;
    transactionChargeType?: 1 | 2 | 3;
    defaultPaymentCountry?: CountryName;
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
interface TransactionInternal {
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
    DefaultPaymentCountry?: CountryName;
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
    serviceType: string | number;
    serviceDescription: string;
    serviceDate: string;
    serviceFrom?: string;
    serviceTo?: string;
}
interface ServiceInternal {
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
interface InitiatePaymentPayload {
    transaction: Transaction;
    services: Service[];
    additional?: Additional;
}
interface InitiatePaymentPayloadInternal {
    Transaction: TransactionInternal;
    Services: ServiceInternal[];
    Additional?: Additional;
}
interface ChargeMobilePayment {
    transactionToken: string;
    phoneNumber: string;
    mno: MOBILE_NETWORK_OPERATOR;
    mnoCountry: CountryName;
}
interface CheckPaymentStatus {
    transactionToken: string;
}
interface CheckPaymentStatusInternal {
    TransactionToken: string;
}
interface ChargeCreditCardPayment {
    transactionToken: string;
    creditCardNumber: string;
    creditCardExpiry: string;
    creditCardCVV: string;
    cardHolderName: string;
    chargeType?: string;
}
interface ChargeCreditCardPaymentInternal {
    TransactionToken: string;
    CreditCardNumber: string;
    CreditCardExpiry: string;
    CreditCardCVV: string;
    CardHolderName: string;
    ChargeType?: string;
}
interface CancelPayment {
    transactionToken: string;
}
interface CancelPaymentInternal {
    TransactionToken: string;
}
interface RefundPayment {
    transactionToken: string;
    refundAmount: number;
    refundDetails: string;
}
interface RefundPaymentInternal {
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
type DPOPayload<T> = {
    API3G: {
        CompanyToken: string;
        Request: DPO_REQUEST_TYPE;
    } & T;
};
declare enum DPO_REQUEST_TYPE {
    CREATE_TOKEN = "createToken",
    REFUND_TOKEN = "refundToken",
    UPDATE_TOKEN = "updateToken",
    VERIFY_TOKEN = "verifyToken",
    CANCEL_TOKEN = "cancelToken",
    CHARGE_TOKEN_BANK_TRANSFER = "chargeTokenBankTransfer",
    CHARGE_TOKEN_CREDIT_CARD = "chargeTokenCreditCard",
    CHARGE_TOKEN_MOBILE = "chargeTokenMobile"
}
declare enum PAYMENT_STRATEGY_TYPE {
    MOBILE_MONEY = "mobileMoney",
    CARD = "card"
}
interface ChargeMobilePaymentInternal {
    TransactionToken: string;
    PhoneNumber: string;
    MNO: MOBILE_NETWORK_OPERATOR;
    MNOcountry: CountryName;
}

declare class DPOPayment {
    private companyToken;
    private apiVersion;
    private paymentURL;
    constructor({ companyToken, apiVersion }: DPOPaymentOptions);
    initiatePayment(initiatePaymentObject: InitiatePaymentPayload): Promise<DPOInitiatePaymentResponse>;
    processMobileMoneyPayment(paymentObject: ChargeMobilePayment): Promise<any>;
    processCardPayment(paymentObject: ChargeCreditCardPayment): Promise<any>;
    refundPayment(refundPaymentObject: RefundPayment): Promise<DPOResponse>;
    cancelPayment(cancelPaymentObject: CancelPayment): Promise<DPOResponse>;
    checkPaymentStatus(checkPaymentStatusObject: CheckPaymentStatus): Promise<DPOCheckPaymentStatusResponse>;
    parseWebhookXML(xml: string): WebhookResponse;
}

export { type APIVersion, type Additional, type CancelPayment, type CancelPaymentInternal, type ChargeCreditCardPayment, type ChargeCreditCardPaymentInternal, type ChargeMobilePayment, type ChargeMobilePaymentInternal, type CheckPaymentStatus, type CheckPaymentStatusInternal, type CountryCode, type CountryName, type Currency, type DPOCheckPaymentStatusResponse, type DPOInitiatePaymentResponse, type DPOPayload, DPOPayment, type DPOPaymentOptions, type DPOResponse, DPO_REQUEST_TYPE, type ErrorResponse, type InitiatePaymentPayload, type InitiatePaymentPayloadInternal, MOBILE_NETWORK_OPERATOR, PAYMENT_STRATEGY_TYPE, type RefundPayment, type RefundPaymentInternal, type Service, type ServiceInternal, type StatusCodeResponse, type StatusResponse, type SuccessResponse, type Transaction, type TransactionInternal, type WebhookJSONResponse, type WebhookResponse };
