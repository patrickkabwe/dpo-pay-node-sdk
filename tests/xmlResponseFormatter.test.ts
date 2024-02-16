import { describe, expect, it } from "vitest";
import { xmlResponseFormatter } from "~/helpers/xmlResponseFormatter";

describe("xmlResponseFormatter", () => {
  it("should format xml response", () => {
    const xml = `
      <API3G>
        <StatusCode>0</StatusCode>
        <Result>0</Result>
        <ResultExplanation>success</ResultExplanation>
        <Transaction>
          <TransactionID>123</TransactionID>
          <TransactionDate>2021-01-01</TransactionDate>
          <TransactionAmount>100</TransactionAmount>
        </Transaction>
      </API3G>
    `;
    const result = xmlResponseFormatter(xml);

    expect(result).toEqual({
      statusCode: 200,
      message: "success",
      transaction: {
        transactionID: 123,
        transactionDate: "2021-01-01",
        transactionAmount: 100,
      },
    });
  });

  it("should format xml response with a 200 status code", () => {
    const xml = `
        <API3G>
            <StatusCode>130</StatusCode>
            <Result>130</Result>
            <ResultExplanation>success</ResultExplanation>
            <Transaction>
            <TransactionID>123</TransactionID>
            <TransactionDate>2021-01-01</TransactionDate>
            <TransactionAmount>100</TransactionAmount>
            </Transaction>
        </API3G>
        `;
    const result = xmlResponseFormatter(xml);

    expect(result).toEqual({
      statusCode: 200,
      message: "success",
      transaction: {
        transactionID: 123,
        transactionDate: "2021-01-01",
        transactionAmount: 100,
      },
    });
  });

  it("should format xml response with a 400 status code", () => {
    const xml = `
        <API3G>
            <StatusCode>801</StatusCode>
            <Result>000</Result>
            <ResultExplanation>Request missing company token</ResultExplanation>
            <Transaction>
            <TransactionID>123</TransactionID>
            <TransactionDate>2021-01-01</TransactionDate>
            <TransactionAmount>100</TransactionAmount>
            </Transaction>
        </API3G>
    `;
    const result = xmlResponseFormatter(xml);

    expect(result).toEqual({
      statusCode: 400,
      message: "Request missing company token",
      transaction: {
        transactionID: 123,
        transactionDate: "2021-01-01",
        transactionAmount: 100,
      },
    });
  });
});
