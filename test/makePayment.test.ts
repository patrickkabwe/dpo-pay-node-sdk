import { describe, expect, it, vi } from "vitest";
import { DPOPayment } from "../src/index";

vi.mock("./src/config/axios", async () => {
  const axios = (await vi.importActual("axios")) as any;

  return { ...axios, post: vi.fn() };
});

describe("DPO Payment", () => {
  const dpoPayment = new DPOPayment({
    companyToken: "123123123",
  });

  it("should be an instance of DPOPayment with companyToken", () => {
    expect(dpoPayment).toBeInstanceOf(DPOPayment);
  });

  it("should be make a payment", async () => {
    const paymentExpected = {
      status: "success",
      statusCode: 200,
    };
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
      },
    });

    expect(response).toEqual(paymentExpected);
  });
});
