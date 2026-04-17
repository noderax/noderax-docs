type ServiceState = {
  service: string;
  status: "ok" | "down";
  endpoint: string;
  note?: string;
};

const CDN_ENDPOINT = "https://cdn.noderax.net/";
const REQUEST_TIMEOUT_MS = 6500;

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function downState(note: string): ServiceState {
  return {
    service: "noderax-agent-cdn",
    status: "down",
    endpoint: CDN_ENDPOINT,
    note,
  };
}

async function getCdnState(): Promise<ServiceState> {
  try {
    const response = await fetchWithTimeout(CDN_ENDPOINT, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      return downState(`CDN check failed (${response.status})`);
    }

    return {
      service: "noderax-agent-cdn",
      status: "ok",
      endpoint: CDN_ENDPOINT,
      note: "Agent package CDN reachable",
    };
  } catch {
    return downState("CDN request timed out or failed");
  }
}

export async function GET() {
  const cdn = await getCdnState();
  const overall = cdn.status === "ok" ? "ok" : "degraded";

  return Response.json(
    {
      overall,
      checkedAt: new Date().toISOString(),
      cdn,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
      },
    },
  );
}
