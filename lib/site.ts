export const site = {
  name: "Noderax Docs",
  appName: "Noderax",
  title: "Noderax Documentation",
  description:
    "Noderax documentation for operators, platform admins, and developers running the installer-managed control plane, API, web app, and agent runtime.",
  url: "https://docs.noderax.net",
  productUrl: "https://dash.noderax.net",
  marketingUrl: "https://noderax.net",
  githubUrl: "https://github.com/noderax",
  installCommand:
    "curl -fsSL https://cdn.noderax.net/noderax-platform/install.sh | sudo bash",
  git: {
    user: "noderax",
    repo: "noderax-docs",
    branch: "main",
  },
} as const;
