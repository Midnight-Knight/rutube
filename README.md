## Инструкция

Первый запуск

```bash
# Важно, укажите зависимости в файле next.config.mjs в env
# Установка зависимостей
npm run i
```

Зависимости (next.config.mjs)
```js
// Пример
const nextConfig = {
    env: {
        HTTP_VIDEO_DOWNLOAD: 'https://75a8-109-252-24-49.ngrok-free.app/api/videos/download', // адрес пополнения БД без модерации
        WS_VIDEO_DOWNLOAD: 'https://75a8-109-252-24-49.ngrok-free.app/api/status/currentStatus', // адрес проверки статуса пополнения
        HTTP_VIDEO_MODERATION: 'https://75a8-109-252-24-49.ngrok-free.app/api/videos/verify', // адрес пополнения БД с модерацией
        WS_VIDEO_MODERATION: 'https://75a8-109-252-24-49.ngrok-free.app/api/status/getNotifications', // адрес проверки статуса модерации
    }
};
```

```bash
# Запуск в dev режиме
npm run dev
```

```bash
# Сборка приложения
npm run build
# Запуск сборки
npm run start
```

По умолчанию сайт должен открыть на [http://localhost:3000](http://localhost:3000), однако в случае, если порт занят, то он моет занять порт на 1 выше (пример: если порт 3000 занят, то он займёт 3001).