import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      tabs={false}
      sidebar={{
        defaultOpenLevel: 1,
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
