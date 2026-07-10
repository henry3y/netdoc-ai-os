/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[1] : "";
const isUserSite = repoName.endsWith(".github.io");
const basePath = process.env.GITHUB_ACTIONS === "true" && repoName && !isUserSite ? `/${repoName}` : "";

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
