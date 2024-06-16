/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HTTP_VIDEO_DOWNLOAD: 'http://caddy:5291/api/videos/download', // адрес пополнения БД без модерации
        WS_VIDEO_DOWNLOAD: 'http://caddy:5291/api/status/currentStatus', // адрес проверки статуса пополнения
        HTTP_VIDEO_MODERATION: 'http://caddy:5291/api/videos/verify', // адрес пополнения БД с модерацией
        WS_VIDEO_MODERATION: 'http://caddy:5291/api/status/currentStatus', // адрес проверки статуса модерации
    }
};

export default nextConfig;
