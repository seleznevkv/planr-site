# РостПро — интерактивный гайд

Продающий веб-гайд по ролям (собственник, операционный директор, финансовый директор, ГИП, руководитель подразделения, исполнитель) для холодных лидов.

## Разработка

```bash
npm install
npm run dev
```

Форма заявки (`/api/contact`) под чистым `vite dev` не работает — там нет сервера,
который бы её обслуживал. Для проверки формы целиком:

```bash
npm run build
npm run start   # поднимет server.js на :80 (или $PORT), раздаёт dist/ и /api/contact
```

Переменные окружения — см. `.env.example` (те же значения SMTP, что и у planr-site).

## Сборка и запуск

```bash
npm run build   # -> dist/
npm run start   # Express-сервер: статика из dist/ + POST /api/contact (nodemailer)
```

## Деплой (Docker, как основной сайт)

Собирается и разворачивается так же, как planr-site — Docker-образ в
`registry.planr.cloud`, запуск через `docker-compose.yml` за Traefik.

```bash
./build.sh -r="registry.planr.cloud/site" -v="1.0.0"
```

В `docker-compose.yml` (в корне репозитория planr-site) уже добавлен сервис `guide`
на домене `guide.rostpro.tech`. Перед запуском на сервере нужно задать реальные
переменные окружения (`SMTP_PASS` и при необходимости остальные — те же значения,
что у сервиса `ui`), чтобы заявки с гайда уходили на тот же адрес, что и с сайта.
