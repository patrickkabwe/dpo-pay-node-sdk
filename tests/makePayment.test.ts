import { describe, expect, it, vi } from "vitest";
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
    const paymentExpected = {
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
      Services: [
        {
          Service: {
            ServiceType: 5525,
            ServiceDescription: "ServiceDescription",
            ServiceDate: "2021-01-01",
          },
        },
      ],
      Transaction: {
        PaymentAmount: 100,
        PaymentCurrency: "ZMW",
        CompanyRef: "CompanyRef",
        RedirectURL: "https://example.com",
        BackURL: "https://example.com",
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

    expect(response).toHaveProperty("statusCode", paymentExpected.statusCode);
    expect(response).toHaveProperty("message", paymentExpected.message);
    expect(response.paymentURL).toBeDefined();
  });

  it("should make a mobile money payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });
    const paymentExpected = {
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

    const response = await dpoPayment.chargeMobilePayment({
      MNO: "MTNZM",
      MNOcountry: "zambia",
      PhoneNumber: "260961234567",
      TransactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
    });

    expect(response).toHaveProperty("statusCode", paymentExpected.statusCode);
  });

  it("should be check payment status", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const paymentExpected = {
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
      TransactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07WA5CA560",
    });

    expect(response).toHaveProperty("statusCode", paymentExpected.statusCode);
    expect(response).toHaveProperty("message", paymentExpected.message);
  });

  it("should be cancel payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const paymentExpected = {
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
      TransactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
    });

    expect(response).toHaveProperty("statusCode", paymentExpected.statusCode);
    expect(response).toHaveProperty("message", paymentExpected.message);
  });

  it("should be refund payment", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const paymentExpected = {
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
      TransactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
      refundAmount: 100,
      refundDetails: "Refund details",
    });

    expect(response).toHaveProperty("statusCode", paymentExpected.statusCode);
    expect(response).toHaveProperty("message", paymentExpected.message);
  });

  it("should be throw an error", async () => {
    const dpoPayment = new DPOPayment({
      companyToken: "72983CAC-5DB1-4C7F-BD88-352066B71592",
    });

    const paymentExpected = {
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
        TransactionToken: "63B185BD-B8C0-4A9F-9F6E-AE07EA5CA560",
      });
    } catch (error: any) {
      error.message = JSON.parse(error.message);
      expect(error.message).toHaveProperty(
        "statusCode",
        paymentExpected.statusCode
      );
      expect(error.message).toHaveProperty("message", paymentExpected.message);
      expect(error).toHaveProperty("code", paymentExpected.statusCode);
    }
  });
});
