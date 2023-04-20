import { xmlToJson } from "./xmlToJson copy";

export const xmlResponseFormatter = (xml: any): any => {
  return xmlToJson(xml);
};
