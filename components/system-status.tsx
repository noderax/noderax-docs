"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Package } from "lucide-react";

type ServiceState = {
  service: string;
  status: "ok" | "down";
  endpoint: string;
  note?: string;
};

type SystemStatusPayload = {
  overall: "ok" | "degraded";
  checkedAt: string;
  cdn: ServiceState;
};

const POLL_INTERVAL_MS = 10000;

const fallbackState: SystemStatusPayload = {
  overall: "degraded",
  checkedAt: "",
  cdn: {
    service: "noderax-agent-cdn",
    status: "down",
    endpoint: "https://cdn.noderax.net/",
    note: "Fetching live status...",
  },
};

function statusBadgeClasses(status: "ok" | "down") {
  return status === "ok"
    ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"
    : "bg-red-500/12 text-red-700 dark:text-red-300";
}

function statusDotClasses(status: "ok" | "down") {
  return status === "ok" ? "bg-emerald-500" : "bg-red-500";
}

function triggerClasses(status: "ok" | "degraded") {
  return status === "ok"
    ? "border-emerald-500/25 bg-emerald-500/8 hover:bg-emerald-500/12"
    : "border-red-500/25 bg-red-500/8 hover:bg-red-500/12";
}

export function SystemStatus() {
  const [status, setStatus] = useState<SystemStatusPayload>(fallbackState);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/system-status", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Status request failed (${response.status})`);
      }

      const payload = (await response.json()) as SystemStatusPayload;
      setStatus(payload);
    } catch {
      setStatus((prev) => ({
        ...prev,
        overall: "degraded",
        checkedAt: new Date().toISOString(),
        cdn: {
          ...prev.cdn,
          status: "down",
          note: "CDN check temporarily unavailable",
        },
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
    const intervalId = window.setInterval(() => {
      void fetchStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchStatus]);

  const indicatorClass = useMemo(
    () => statusDotClasses(status.overall === "ok" ? "ok" : "down"),
    [status.overall],
  );

  return (
    <div className="group relative ms-2 shrink-0">
      <button
        type="button"
        className={[
          "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold text-fd-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/40",
          triggerClasses(status.overall),
        ].join(" ")}
      >
        <span
          className={[
            "flex h-2 w-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.35)]",
            indicatorClass,
            status.overall === "ok" ? "animate-pulse" : "",
          ].join(" ")}
        />
        <span className="hidden sm:inline">System Status</span>
        <span className="sm:hidden">Status</span>
        {isLoading ? <span className="hidden lg:inline">(loading)</span> : null}
      </button>

      <div className="pointer-events-none absolute left-0 top-[calc(100%+10px)] z-40 w-[min(22rem,calc(100vw-2rem))] translate-y-1 rounded-2xl border border-fd-border bg-fd-background/96 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="grid gap-2">
          <a
            href={status.cdn.endpoint}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-fd-border bg-fd-card p-3 transition-colors hover:bg-fd-accent"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-fd-foreground">
                <Package className="h-3.5 w-3.5 text-fd-primary" />
                CDN
              </span>
              <span
                className={[
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                  statusBadgeClasses(status.cdn.status),
                ].join(" ")}
              >
                {status.cdn.status}
              </span>
            </div>
            <p className="truncate text-[11px] font-semibold text-fd-foreground">
              {status.cdn.service}
            </p>
            {status.cdn.note ? (
              <p className="mt-1 text-[10px] text-fd-muted-foreground">
                {status.cdn.note}
              </p>
            ) : null}
            <p className="mt-1 truncate text-[10px] text-fd-muted-foreground">
              {status.cdn.endpoint}
            </p>
          </a>
        </div>
        {status.checkedAt ? (
          <p className="mt-2 px-1 text-[10px] text-fd-muted-foreground">
            Last update: {status.checkedAt}
          </p>
        ) : null}
      </div>
    </div>
  );
}
