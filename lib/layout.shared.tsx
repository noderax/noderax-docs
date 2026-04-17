import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookOpenText, Github, Rocket } from "lucide-react";
import { SystemStatus } from "@/components/system-status";
import { site } from "./site";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          <BookOpenText className="size-4" />
          {site.name}
        </span>
      ),
      children: <SystemStatus />,
    },
    links: [
      {
        text: "Docs Home",
        url: "/",
        icon: <Rocket className="size-4" />,
        active: "nested-url",
      },
      {
        text: "GitHub",
        url: site.githubUrl,
        external: true,
        icon: <Github className="size-4" />,
      },
    ],
    githubUrl: `${site.githubUrl}/${site.git.repo}`,
  };
}
