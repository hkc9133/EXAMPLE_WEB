/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    env: {
        PROXY_HOST: process.env.PROXY_HOST || process.env.NEXT_PUBLIC_URL,
    },
    output: "standalone",
    reactStrictMode: false,
    swcMinify: true,
    compress: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        domains: ["localhost"],
    },
    logging: {
        fetches: {
            fullUrl: process.env.NODE_ENV === "production",
        },
    },
    experimental: {
        serverComponentsExternalPackages: ["pino", "pino-pretty"],
    },
    async redirects() {
        return [
            {
                source: process.env.NEXT_PUBLIC_ADMIN_BASE,
                destination: `${process.env.NEXT_PUBLIC_ADMIN_BASE}/dashboard`,
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
