# Persona Analytics

Веб-дашборд для аналитики бота [Persona](https://github.com/.../persona). Доступ только через SSH-туннель.

## Возможности

- Табы: Payments, Conversion, Returns, Traffic Sources, Repeat Purchases
- Диапазон дат с пресетами (7/30/90 дней)
- Графики ECharts с легендой (клик для скрытия серий)
- Тёмная/светлая тема по системным настройкам

## Доступ через ssh -L

Dev (Persona на 5213):

```bash
ssh -L 28080:127.0.0.1:8765 USER@VPS_HOST
```

Открыть в браузере: http://localhost:28080

Prod (Persona на 5214):

```bash
ssh -L 28081:127.0.0.1:8766 USER@VPS_HOST
```

Открыть в браузере: http://localhost:28081

Одновременно:

```bash
ssh -L 28080:127.0.0.1:8765 -L 28081:127.0.0.1:8766 USER@VPS_HOST
```

## Сборка

```bash
npm run build
```

Статика в `dist/`.

## Деплой

Деплой через GitHub Actions (push в `main`). Секреты:

- `VPS_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `DEPLOY_PATH`

Пример nginx — `docs/nginx-example.conf`.
