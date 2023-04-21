import { XMLParser } from "fast-xml-parser";

export const xmlToJson = (xml: any): any => {
  const parser = new XMLParser();

  const jsonContent = parser.parse(xml);

  return jsonContent;
};
