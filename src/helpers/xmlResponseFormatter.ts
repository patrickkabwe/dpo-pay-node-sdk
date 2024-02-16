import { DPOResponse } from "~/types";
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
