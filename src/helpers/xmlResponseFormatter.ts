import { DPOResponse, WebhookResponse } from "~/types";
import { camelize } from "./camelize";
import { xmlToJson } from "./xmlToJson";

export const xmlResponseFormatter = (
  xml: string,
  delFields = true
): DPOResponse => {
  const formattedXml = xmlToJson(xml);
  const status = formattedXml.API3G?.StatusCode || formattedXml.API3G?.Result;
  const message = formattedXml.API3G?.ResultExplanation || "success";

  const keyValueObject = Object.entries(formattedXml.API3G)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        const nestedObject = Object.entries(value)
          .map(([nestedKey, nestedValue]) => {
            return { [camelize(nestedKey)]: nestedValue };
          })
          .reduce((acc, curr) => {
            return { ...acc, ...curr };
          });

        return { [camelize(key)]: nestedObject };
      }
      return { [camelize(key)]: value };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    });
  if (delFields) {
    delete keyValueObject["result"];
    delete keyValueObject["resultExplanation"];
  }

  switch (status) {
    case 0:
    case 130:
    case 900:
    case "success":
      return {
        ...keyValueObject,
        statusCode: 200,
        message,
      };
    default:
      return {
        ...keyValueObject,
        statusCode: 400,
        message,
      };
  }
};

/**
 * @description This function formats the response from the webhook
 * @param {string} xml
 * @returns { WebhookResponse }
 *
 */
export const webhookResponse = (xml: string): WebhookResponse => {
  try {
    const dpoJsonResponse = xmlResponseFormatter(
      xml,
      false
    ) as WebhookResponse["dpoJsonResponse"];

    const dpoXMLResponse = `
<?xml version="1.0" encoding="UTF-8"?>
<API3G>  
  <Response>OK</Response>
</API3G>
`;

    return {
      dpoJsonResponse,
      dpoXMLResponse,
    };
  } catch (error: any) {
    return {
      dpoJsonResponse: {
        status: "error",
        statusCode: 500,
        message: error.message,
      } as any as WebhookResponse["dpoJsonResponse"],
      dpoXMLResponse: `
<?xml version="1.0" encoding="UTF-8"?>
<API3G>
  <Response>Failed</Response>
  <Result>Failed</Result>
  <ResultExplanation>${error.message}</ResultExplanation>
</API3G>
`,
    };
  }
};
