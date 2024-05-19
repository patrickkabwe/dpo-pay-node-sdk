import { describe, expect, it } from "vitest";
import { webhookResponse } from "~/helpers/xmlResponseFormatter";

describe("webhookResponse", () => {
  it("should format webhook response", () => {
    const xml = `
        <API3G>
            <Result>000</Result>
            <ResultExplanation>Transaction created</ResultExplanation>
        </API3G>
        `;
    const result = webhookResponse(xml);
    const dpoXMLResponse = `
<?xml version="1.0" encoding="UTF-8"?>
<API3G>  
  <Response>OK</Response>
</API3G>
`;
    expect(result).toEqual({
      dpoJsonResponse: {
        statusCode: 200,
        message: "Transaction created",
        result: 0,
        resultExplanation: "Transaction created",
      },
      dpoXMLResponse,
    });
  });
});
