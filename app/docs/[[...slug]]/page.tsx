import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { MarkdownCopyButton } from "fumadocs-ui/layouts/docs/page";
import { createAPIPage } from "fumadocs-openapi/ui";
import { getMDXComponents } from "@/components/mdx";
import { gitConfig } from "@/lib/shared";
import { openapi, source } from "@/lib/source";

const APIPage = createAPIPage(openapi);

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolved = await params;
  const page = source.getPage(resolved.slug);
  const slug = resolved.slug ?? [];
  const markdownUrl =
    slug.length > 0
      ? `/api/markdown/${slug.map(encodeURIComponent).join("/")}`
      : "/api/markdown";

  if (!page) notFound();

  if (page.data.type === "openapi") {
    return (
      <DocsPage toc={page.data.toc}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <div className="not-prose mb-6 flex flex-wrap items-center gap-2">
          <MarkdownCopyButton
            markdownUrl={markdownUrl}
            className="max-sm:w-full max-sm:justify-center"
          />
        </div>
        <DocsBody>
          <APIPage
            {...page.data.getAPIPageProps()}
            showTitle={false}
            showDescription={false}
          />
        </DocsBody>
      </DocsPage>
    );
  }

  const MDX = page.data.body;
  const pageToc = page.data.toc.filter(
    (item, index) => !(index === 0 && item.depth === 1),
  );

  return (
    <DocsPage
      toc={pageToc}
      full={page.data.full}
      editOnGithub={{
        owner: gitConfig.user,
        repo: gitConfig.repo,
        sha: gitConfig.branch,
        path: `content/docs/${page.path}`,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="not-prose mb-6 flex flex-wrap items-center gap-2">
        <MarkdownCopyButton
          markdownUrl={markdownUrl}
          className="max-sm:w-full max-sm:justify-center"
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolved = await params;
  const page = source.getPage(resolved.slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
