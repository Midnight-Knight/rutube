/** @type {import('next').NextConfig} */
const nextConfig = {
    /*env: {
        HTTP_VIDEO_DOWNLOAD: 'https://3ce0-109-252-24-49.ngrok-free.app/api/videos/download', // адрес пополнения БД без модерации http://caddy:5291/api/videos/download
        WS_VIDEO_DOWNLOAD: 'https://3ce0-109-252-24-49.ngrok-free.app/api/status/currentStatus', // адрес проверки статуса пополнения http://caddy:5291/api/status/currentStatus
        HTTP_VIDEO_MODERATION: 'https://3ce0-109-252-24-49.ngrok-free.app/api/videos/verify', // адрес пополнения БД с модерацией http://caddy:5291/api/videos/verify
        WS_VIDEO_MODERATION: 'https://3ce0-109-252-24-49.ngrok-free.app/api/status/currentStatus', // адрес проверки статуса модерации http://caddy:5291/api/status/currentStatus
    }*/
};

export default nextConfig;
