import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NextResponse } from "next/server";
import { source } from "@/lib/source";

const routeFilePath = fileURLToPath(import.meta.url);
const routeDir = path.dirname(routeFilePath);
const docsRoot = path.resolve(routeDir, "../../../../content/docs");

function stripFrontmatter(input: string): string {
  if (!input.startsWith("---\n")) {
    return input;
  }

  const end = input.indexOf("\n---\n", 4);
  if (end === -1) {
    return input;
  }

  return input.slice(end + 5).trimStart();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const resolved = await params;
  const page = source.getPage(resolved.slug);

  if (!page) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (page.data.type === "openapi") {
    const markdown = [
      `# ${page.data.title}`,
      "",
      page.data.description ?? "Generated API reference page.",
      "",
      "> This page is generated from the checked-in OpenAPI snapshot used by Noderax Docs.",
      "",
      `Source path: /docs/${(resolved.slug ?? []).join("/")}`,
      "",
    ].join("\n");

    return new NextResponse(markdown, {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=3600",
      },
    });
  }

  const absolutePath = path.join(docsRoot, page.path);
  const raw = await readFile(absolutePath, "utf8");
  const markdown = stripFrontmatter(raw);

  return new NextResponse(markdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
