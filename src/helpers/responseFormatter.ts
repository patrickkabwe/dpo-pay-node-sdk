import { DPOResponse } from "~/types";
import { xmlToJson } from "./xmlToJson";

export const xmlResponseFormatter = (xml: any): DPOResponse => {
  const formattedXml = xmlToJson(xml);
  const status = formattedXml.API3G?.StatusCode || formattedXml.API3G?.Result;
  const message = formattedXml.API3G?.ResultExplanation || "success";
  const keyValueObject = Object.entries(formattedXml.API3G)
    .map(([key, value]) => {
      return { [key]: value };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    });
  delete keyValueObject["Result"];
  delete keyValueObject["ResultExplanation"];
  switch (status) {
    case 0:
    case 130:
      return {
        statusCode: 200,
        message,
        ...keyValueObject,
      };
    default:
      return {
        statusCode: 400,
        message,
        ...keyValueObject,
      };
  }
};
