import { describe, expect, it, vi } from "vitest";
import { DPOError } from "~/helpers/error";
import { MOBILE_NETWORK_OPERATOR } from "~/types";
import { DPOPayment } from "../src/dpo";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

describe("DPO Payment", () => {
  it("should be initiate a payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });
    const expectedPaymentResponse = {
      statusCode: 200,
      message: "Transaction created",
    };

    const xmlRes = `
      <API3G>
          <Result>000</Result>
          <ResultExplanation>Transaction created</ResultExplanation>
          <TransToken>63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560</TransToken>
          <Transaction>
          <TransactionID>123</TransactionID>
          <TransactionDate>2021-01-01</TransactionDate>
          <TransactionAmount>100</TransactionAmount>
          </Transaction>
      </API3G>
    `;

    mocks.post.mockResolvedValueOnce({
      data: xmlRes,
    });

    const response = await dpoPayment.initiatePayment({
      services: [
        {
          serviceType: 5525,
          serviceDescription: "ServiceDescription",
          serviceDate: "2021-01-01",
        },
      ],
      transaction: {
        paymentAmount: 100,
        paymentCurrency: "ZMW",
        companyRef: "CompanyRef",
        redirectURL: "https://example.com",
        backURL: "https://example.com",
        customerAddress: "customerAddress",
        customerCity: "customerCity",
        customerCountry: "Zambia",
        customerEmail: "patrickckabwe@gmail.com",
        customerFirstName: "Patrick",
        customerLastName: "Kabwe",
        customerPhone: "0971234567",
        customerZip: "10101",
      },
    });

    expect(response).toHaveProperty(
      "statusCode",
      expectedPaymentResponse.statusCode
    );
    expect(response).toHaveProperty("message", expectedPaymentResponse.message);
    expect(response.paymentURL).toBeDefined();
  });

  it("should make a mobile money payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });
    const expectedPaymentResponse = {
      statusCode: 200,
      message: "Transaction created",
    };

    const xmlRes = `
      <API3G>
        <StatusCode>130</StatusCode>
        <Result>000</Result>
        <ResultExplanation>Transaction created</ResultExplanation>
        <Transaction>
        <TransactionID>123</TransactionID>
        <TransactionDate>2021-01-01</TransactionDate>
        <TransactionAmount>100</TransactionAmount>
        </Transaction>
      </API3G>
    `;

    mocks.post.mockResolvedValueOnce({
      data: xmlRes,
    });

    const response = await dpoPayment.processMobileMoneyPayment({
      mno: MOBILE_NETWORK_OPERATOR.ZAMBIA_MTN,
      mnoCountry: "zambia",
      phoneNumber: "260961234567",
      transactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
    });

    expect(response).toHaveProperty(
      "statusCode",
      expectedPaymentResponse.statusCode
    );
  });

  it("should make a card payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });
    const expectedPaymentResponse = {
      statusCode: 200,
      message: "Transaction created",
    };

    const xmlRes = `
      <API3G>
        <StatusCode>130</StatusCode>
        <Result>000</Result>
        <ResultExplanation>Transaction created</ResultExplanation>
        <Transaction>
        <TransactionID>123</TransactionID>
        <TransactionDate>2021-01-01</TransactionDate>
        <TransactionAmount>100</TransactionAmount>
        </Transaction>
      </API3G>
    `;

    mocks.post.mockResolvedValueOnce({
      data: xmlRes,
    });

    const response = await dpoPayment.processCardPayment({
      cardHolderName: "Patrick Kabwe",
      creditCardCVV: "123",
      creditCardExpiry: "01/23",
      creditCardNumber: "123456789012",
      transactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
    });

    expect(response).toHaveProperty(
      "statusCode",
      expectedPaymentResponse.statusCode
    );
  });

  it("should be check payment status", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const expectedPaymentResponse = {
      statusCode: 200,
      message: "Transaction not paid yet",
    };

    const xmlRes = `
      <API3G>
          <Result>900</Result>
          <ResultExplanation>Transaction not paid yet</ResultExplanation>
      </API3G>
    `;

    mocks.post.mockResolvedValueOnce({
      data: xmlRes,
    });

    const response = await dpoPayment.checkPaymentStatus({
      transactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07WA5CA560",
    });

    expect(response).toHaveProperty(
      "statusCode",
      expectedPaymentResponse.statusCode
    );
    expect(response).toHaveProperty("message", expectedPaymentResponse.message);
  });

  it("should be cancel payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const expectedPaymentResponse = {
      statusCode: 200,
      message: "Token been updated to status cancelled",
    };

    const xmlRes = `
      <API3G>
          <Result>000</Result>
          <ResultExplanation>Token been updated to status cancelled</ResultExplanation>
      </API3G>
    `;

    mocks.post.mockResolvedValueOnce({
      data: xmlRes,
    });

    const response = await dpoPayment.cancelPayment({
      transactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
    });

    expect(response).toHaveProperty(
      "statusCode",
      expectedPaymentResponse.statusCode
    );
    expect(response).toHaveProperty("message", expectedPaymentResponse.message);
  });

  it("should be refund payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const expectedPaymentResponse = {
      statusCode: 200,
      message: "Refund processed successfully",
    };

    const xmlRes = `
      <API3G>
          <Result>000</Result>
          <ResultExplanation>Refund processed successfully</ResultExplanation>
      </API3G>
    `;

    mocks.post.mockResolvedValueOnce({
      data: xmlRes,
    });

    const response = await dpoPayment.refundPayment({
      transactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
      refundAmount: 100,
      refundDetails: "Refund details",
    });

    expect(response).toHaveProperty(
      "statusCode",
      expectedPaymentResponse.statusCode
    );
    expect(response).toHaveProperty("message", expectedPaymentResponse.message);
  });

  it("should be throw an error", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const expectedPaymentResponse = {
      statusCode: 400,
      message: "Invalid transaction token",
    };

    const xmlRes = `
      <API3G>
          <Result>903</Result>
          <ResultExplanation>Invalid transaction token</ResultExplanation>
      </API3G>
    `;

    mocks.post.mockResolvedValueOnce({
      data: xmlRes,
    });

    try {
      await dpoPayment.cancelPayment({
        transactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(DPOError);
      expect(error).toHaveProperty("code", expectedPaymentResponse.statusCode);
      expect(error).toHaveProperty("message", expectedPaymentResponse.message);
      expect(error).toHaveProperty("response", expectedPaymentResponse);
    }
  });
});
