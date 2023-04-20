import { XMLBuilder } from "fast-xml-parser";

export const jsonToXml = (json: any): any => {
  const builder = new XMLBuilder();
  const xmlContent = `<?xml version="1.0" encoding="utf-8"?>${builder.build(
    json
  )}`;

  return xmlContent;
};
