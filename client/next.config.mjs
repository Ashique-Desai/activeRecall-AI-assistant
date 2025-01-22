import path from 'path';

// Workaround for __dirname in ES Modules
const __dirname = new URL('.', import.meta.url).pathname;

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 'http://backend:8000/:path*', // Use service name instead of localhost in docker
            },
        ]
    },
    webpack(config) {
        // Add the alias configuration here
        config.resolve.alias['@'] = path.resolve(__dirname, 'client/src');
        return config;
    },
};

export default nextConfig;