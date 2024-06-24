## Инструкция

Первый запуск

```bash
# Важно перед сборкой или запуском в dev режиме, укажите env зависимости (ссылки на ручки бэкенда) в файле next.config.mjs в env
# Установка зависимостей (библиотек)
npm i
```

С (next.config.mjs)
```js
// Пример
const nextConfig = {
    env: {
        HTTP_VIDEO_DOWNLOAD: process.env.HTTP_VIDEO_DOWNLOAD_NEXT || 'http://caddy:5291/api/videos/download', // адрес пополнения БД без модерации
        WS_VIDEO_DOWNLOAD: process.env.WS_VIDEO_DOWNLOAD_NEXT || 'http://caddy:5291/api/status/currentStatus', // адрес проверки статуса пополнения
        HTTP_VIDEO_MODERATION: process.env.HTTP_VIDEO_MODERATION_NEXT || 'http://caddy:5291/api/videos/verify', // адрес пополнения БД с модерацией
        WS_VIDEO_MODERATION: process.env.WS_VIDEO_MODERATION_NEXT || 'http://caddy:5291/api/status/currentStatus', // адрес проверки статуса модерации
    }
};
```

Запуск приложения в dev режиме

```bash
# Важно перед сборкой или запуском в dev режиме, укажите env зависимости (ссылки на ручки бэкенда) в файле next.config.mjs в env
# Запуск в dev режиме
npm run dev
```

Сборка и запуск приложения 

```bash
# Важно перед сборкой или запуском в dev режиме, укажите env зависимости (ссылки на ручки бэкенда) в файле next.config.mjs в env
# Сборка приложения
npm run build
# Запуск сборки
npm run start
```

По умолчанию сайт должен открыться на [http://localhost:3000](http://localhost:3000), однако в случае, если порт занят, то он может занять порт на 1 выше (пример: если порт 3000 занят, то он займёт 3001).
