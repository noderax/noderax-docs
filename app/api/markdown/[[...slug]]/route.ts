import { NextResponse } from "next/server";
import { source } from "@/lib/source";

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

  const markdown = await page.data.getText("processed");

  return new NextResponse(markdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
