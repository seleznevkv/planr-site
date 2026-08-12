#!/bin/bash
# Сборка и пуш образа rostpro-guide в registry (по образцу planr-site/build.sh),
# через docker buildx с фиксированной целевой архитектурой linux/amd64 — чтобы
# образ, собранный на Mac (arm64), запускался на amd64-сервере. На linux-amd64
# сборка нативная (без эмуляции), скрипт универсален.
#
# Запускать из папки rostpro-guide/:
#   ./build.sh -r="registry.planr.cloud/site" -v="1.0.0" -c="$(git log -1 --pretty=%h)"
#
# Флаги:
#   -r, --registry  базовый путь registry (обязателен), напр. registry.planr.cloud/site
#   -v, --version   тег версии образа (обязателен)
#   -c, --commit    короткий хеш коммита (для лога, опционально)
#   -p, --platform  целевая архитектура, по умолчанию linux/amd64

for i in "$@"; do
case $i in
    -v=*|--version=*)  VERSION="${i#*=}"; shift ;;
    -c=*|--commit=*)   HASH="${i#*=}"; shift ;;
    -r=*|--registry=*) REGISTRY="${i#*=}"; shift ;;
    -p=*|--platform=*) PLATFORM="${i#*=}"; shift ;;
    *) ;; # unknown option
esac
done

: "${VERSION:?need -v=<version>}"
: "${REGISTRY:?need -r=<registry>}"
PLATFORM="${PLATFORM:-linux/amd64}"
BUILDER="planr-site-builder"

set -e

# buildx-билдер с драйвером docker-container — нужен для кросс-сборки под чужую
# архитектуру и пуша в один шаг (обычный docker-драйвер так не умеет). Идемпотентно.
if docker buildx inspect "${BUILDER}" >/dev/null 2>&1; then
    docker buildx use "${BUILDER}"
else
    docker buildx create --name "${BUILDER}" --driver docker-container --use
fi
# Поднять билдер и подтянуть QEMU для эмуляции чужой архитектуры (при первом запуске).
docker buildx inspect --bootstrap >/dev/null

# buildx собирает под ${PLATFORM} и сразу пушит (--push) — отдельные tag/push не нужны.
docker buildx build --platform "${PLATFORM}" -f Dockerfile \
    -t "${REGISTRY}"/rostpro-guide-ui:"${VERSION}" --push .

echo "Готово: rostpro-guide-ui:${VERSION} → ${REGISTRY} (${PLATFORM}, commit ${HASH})"
