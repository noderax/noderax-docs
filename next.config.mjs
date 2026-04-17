import path from "node:path";
import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const appRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: appRoot,
  },
  outputFileTracingIncludes: {
    "/api/search": ["./openapi/openapi.json"],
    "/api/markdown/\\[\\[\\.\\.\\.slug\\]\\]": ["./openapi/openapi.json"],
  },
};

export default withMDX(nextConfig);
