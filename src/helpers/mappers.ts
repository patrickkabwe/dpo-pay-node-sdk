import {
  CancelPayment,
  CancelPaymentInternal,
  ChargeCreditCardPayment,
  ChargeCreditCardPaymentInternal,
  ChargeMobilePayment,
  ChargeMobilePaymentInternal,
  CheckPaymentStatus,
  CheckPaymentStatusInternal,
  InitiatePaymentPayload,
  InitiatePaymentPayloadInternal,
  RefundPayment,
  RefundPaymentInternal,
} from "..";

export const initiatePaymentMapper = (
  input: InitiatePaymentPayload
): InitiatePaymentPayloadInternal => {
  const { services, transaction } = input;
  const {
    backURL,
    redirectURL,
    companyRef,
    paymentAmount,
    paymentCurrency,
    allowRecurrent,
    companyRefUnique,
    defaultPaymentCountry,
    ptl,
    ptlType,
    transactionChargeType,
    ...rest
  } = transaction;

  return {
    Transaction: {
      BackURL: backURL,
      RedirectURL: redirectURL,
      CompanyRef: companyRef,
      PaymentAmount: paymentAmount,
      PaymentCurrency: paymentCurrency,
      AllowRecurrent: allowRecurrent,
      CompanyRefUnique: companyRefUnique,
      DefaultPaymentCountry: defaultPaymentCountry,
      PTL: ptl,
      PTLtype: ptlType,
      TransactionChargeType: transactionChargeType,
      ...rest,
    },

    Services: services.map((service) => ({
      Service: {
        ServiceType: service.serviceType,
        ServiceDescription: service.serviceDescription,
        ServiceDate: service.serviceDate,
        ServiceFrom: service.serviceFrom,
        ServiceTo: service.serviceTo,
      },
    })),
    Additional: input.additional,
  };
};

export const chargeMobilePaymentMapper = (
  input: ChargeMobilePayment
): ChargeMobilePaymentInternal => ({
  MNO: input.mno,
  MNOcountry: input.mnoCountry,
  PhoneNumber: input.phoneNumber,
  TransactionToken: input.transactionToken,
});

export const chargeCreditCardPaymentMapper = (
  input: ChargeCreditCardPayment
): ChargeCreditCardPaymentInternal => {
  return {
    TransactionToken: input.transactionToken,
    CardHolderName: input.cardHolderName,
    CreditCardCVV: input.creditCardCVV,
    CreditCardExpiry: input.creditCardExpiry,
    CreditCardNumber: input.creditCardNumber,
    ChargeType: input.chargeType,
  };
};

export const refundPaymentMapper = (
  input: RefundPayment
): RefundPaymentInternal => ({
  refundAmount: input.refundAmount,
  refundDetails: input.refundDetails,
  TransactionToken: input.transactionToken,
});

export const cancelPaymentInternalMapper = (
  input: CancelPayment
): CancelPaymentInternal => ({
  TransactionToken: input.transactionToken,
});

export const checkPaymentStatusInternalMapper = (
  input: CheckPaymentStatus
): CheckPaymentStatusInternal => ({
  TransactionToken: input.transactionToken,
});
