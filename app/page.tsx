import Link from "next/link";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { ArrowRight, CloudCog, Code2, Layers3, ShieldCheck } from "lucide-react";
import { CopyCommandButton } from "@/components/copy-command-button";
import { baseOptions } from "@/lib/layout.shared";
import { site } from "@/lib/site";

const pillars = [
  {
    title: "Installer-managed control plane",
    description:
      "Provision the full Noderax control plane with one command, guided setup, built-in nginx, PostgreSQL, Redis, and automatic TLS.",
    icon: CloudCog,
  },
  {
    title: "Workspace-aware operations",
    description:
      "Manage nodes, terminals, diagnostics, packages, tasks, notifications, and root access through a single multi-workspace surface.",
    icon: Layers3,
  },
  {
    title: "Reference-first API docs",
    description:
      "Read hand-authored architecture and operations guides alongside generated OpenAPI reference pages sourced from the API repo.",
    icon: Code2,
  },
  {
    title: "Controlled updates",
    description:
      "Track agent rollouts and installer-managed control-plane updates with releaseId-aware release identity and explicit apply semantics.",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8">
        <section className="rounded-3xl border bg-fd-card p-8 shadow-sm sm:p-10">
          <div className="inline-flex items-center rounded-full border bg-fd-background px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            Installer-managed docs for operators, admins, and developers
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
            Run Noderax without reverse-engineering the control plane.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-fd-muted-foreground sm:text-lg">
            The docs cover the self-hosted install flow, the HA runtime model,
            realtime behavior, split updates center, root access profiles, and
            generated API reference from the checked-in OpenAPI snapshot.
          </p>

          <div className="mt-8 rounded-2xl border bg-fd-background p-4">
            <div className="mb-2 text-sm font-medium text-fd-foreground">
              Fresh install
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border bg-fd-card p-3 sm:flex-row sm:items-center">
              <code className="flex-1 overflow-x-auto whitespace-nowrap text-sm text-fd-foreground">
                {site.installCommand}
              </code>
              <CopyCommandButton command={site.installCommand} />
            </div>
            <p className="mt-3 text-sm text-fd-muted-foreground">
              Start with the installer, finish the guided flow in{" "}
              <code>/setup</code>, then promote into the runtime backed by{" "}
              <code>api-a</code>, <code>api-b</code>, and the web frontend.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-4 py-2.5 text-sm font-semibold text-fd-primary-foreground transition hover:opacity-90"
            >
              Browse documentation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div key={pillar.title} className="rounded-2xl border bg-fd-card p-5">
                <div className="mb-3 inline-flex rounded-xl border bg-fd-background p-2">
                  <Icon className="size-5 text-fd-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-fd-foreground">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link
            href="/docs/start-here/overview"
            className="rounded-2xl border bg-fd-card p-6 transition hover:bg-fd-accent"
          >
            <div className="text-sm font-semibold text-fd-muted-foreground">
              Start Here
            </div>
            <h2 className="mt-2 text-xl font-semibold text-fd-foreground">
              Product surfaces and core concepts
            </h2>
            <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              Understand the control plane, workspace model, node lifecycle,
              release identity, and operating roles.
            </p>
          </Link>

          <Link
            href="/docs/self-hosted/fresh-install"
            className="rounded-2xl border bg-fd-card p-6 transition hover:bg-fd-accent"
          >
            <div className="text-sm font-semibold text-fd-muted-foreground">
              Self-Hosted
            </div>
            <h2 className="mt-2 text-xl font-semibold text-fd-foreground">
              Install, TLS, setup, and updates
            </h2>
            <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              Follow the installer path, runtime promotion, TLS provisioning,
              and control-plane self-update flow.
            </p>
          </Link>

          <Link
            href="/docs/api-reference/overview"
            className="rounded-2xl border bg-fd-card p-6 transition hover:bg-fd-accent"
          >
            <div className="text-sm font-semibold text-fd-muted-foreground">
              API Reference
            </div>
            <h2 className="mt-2 text-xl font-semibold text-fd-foreground">
              Guides plus generated endpoint reference
            </h2>
            <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              Read the auth model, realtime contract, update flows, and the
              generated endpoint pages from the local OpenAPI snapshot.
            </p>
          </Link>
        </section>
      </main>
    </HomeLayout>
  );
}
