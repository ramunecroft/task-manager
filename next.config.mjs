import * as dotenvExpand from "dotenv-expand";

dotenvExpand.expand({parsed: {...process.env}});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["jotai-devtools"],
};

export default nextConfig;
