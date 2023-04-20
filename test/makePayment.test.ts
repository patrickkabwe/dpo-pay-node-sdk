import { describe, expect, it } from "vitest";
import { DPOPayment } from "../src/index";

describe("DPO Payment", () => {
  const dpoPayment = new DPOPayment({
    companyToken: "123123123",
  });

  it("should be an instance of DPOPayment with companyToken", () => {
    expect(dpoPayment).toBeInstanceOf(DPOPayment);
  });

  it("should be make a payment", async () => {
    const amount = 100;
    const paymentExpected = {
      amount,
      status: "success",
      statusCode: 200,
    };
    const payment = await dpoPayment.makePayment(amount);

    expect(payment).toEqual(paymentExpected);
  });
});
