import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

const endpoint = createFromSource(source, {
  language: "english",
});

export const GET = endpoint.staticGET;
