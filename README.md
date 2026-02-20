# Persona Analytics

Веб-дашборд для аналитики бота [Persona](https://github.com/.../persona).

## Возможности

- Табы: Payments, Conversion, Returns, Traffic Sources, Repeat Purchases
- Переключатель Dev/Prod
- Диапазон дат с пресетами (7/30/90 дней)
- Графики ECharts с легендой (клик для скрытия серий)
- Тёмная/светлая тема по системным настройкам

## Разработка

```bash
npm install
npm run dev
```

Переменные окружения — см. `.env.example`. Скопируйте в `.env` и заполните.

Для dev нужен доступ к Persona API. Если Persona на другом порту — укажите `VITE_DEV_API_URL`. Для авторизации задайте `VITE_DEV_ADMIN_KEY` (значение `X-Admin-Key` из Persona).

**CORS:** при вызове Persona с другого origin (например `localhost:5173`) включите CORS в Persona для вашего домена.

## Сборка

```bash
npm run build
```

Статика в `dist/`.

## Деплой

Деплой через GitHub Actions (push в `main`). Настройте секреты репозитория:

- `VPS_HOST` — хост VPS
- `SSH_USER` — пользователь SSH
- `SSH_PRIVATE_KEY` — приватный ключ
- `DEPLOY_PATH` — путь на VPS (например `/var/www/persona-analytics`)

Пример конфигурации nginx — в `docs/nginx-example.conf`.

## Подключение по SSH после деплоя

После деплоя можно подключиться к VPS:

```bash
ssh USER@HOST
cd /var/www/persona-analytics
ls -la
```
