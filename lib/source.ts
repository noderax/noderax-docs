import { docs } from "../.source/server";
import { loader, multiple } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import {
  createOpenAPI,
  openapiPlugin,
  openapiSource,
} from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  input: ["openapi/openapi.json"],
});

const apiReferenceSource = await openapiSource(openapi, {
  baseDir: "api-reference/endpoints",
  meta: {
    folderStyle: "separator",
  },
});

export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
    openapi: apiReferenceSource,
  }),
  {
    baseUrl: "/docs",
    plugins: [lucideIconsPlugin(), openapiPlugin()],
  },
);
