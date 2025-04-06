# Telegram Web App - Магазин

Фронтенд приложение для Telegram Web App в стиле интернет-магазина. Приложение может быть легко встроено в бота Telegram и размещено на GitHub Pages.

## Особенности

- Современный дизайн, адаптированный для Telegram Web App
- Автоматическая адаптация к цветовой схеме Telegram
- Каталог товаров с фильтрацией
- Детальные страницы товаров
- Корзина покупок
- Взаимодействие с API Telegram Web App (основная кнопка, кнопка назад)

## Технологии

- React + TypeScript
- React Router для навигации
- Styled Components для стилизации
- Vite для сборки
- Telegram Web App API

## Установка и запуск

### Предварительные требования

- Node.js версии 14.x или выше
- npm или yarn

### Шаги по установке

1. Клонируйте репозиторий:
   ```
   git clone https://github.com/ваш-логин/tg-shop-webapp.git
   cd tg-shop-webapp
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Запустите проект локально:
   ```
   npm run dev
   ```

4. Для создания production-сборки:
   ```
   npm run build
   ```

## Деплой на GitHub Pages

1. Настройте `vite.config.ts`, указав правильное значение для `base` (обычно имя вашего репозитория)

2. Создайте репозиторий на GitHub и загрузите код:
   ```
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/ваш-логин/tg-shop-webapp.git
   git push -u origin main
   ```

3. Настройте GitHub Actions для автоматического деплоя, добавив `.github/workflows/deploy.yml` с следующим содержимым:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v2

         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'

         - name: Install Dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@4.1.4
           with:
             branch: gh-pages
             folder: dist
   ```

4. Перейдите в настройки репозитория на GitHub → Pages и настройте Source на ветку `gh-pages`

## Интеграция с Telegram ботом

Для интеграции с ботом Telegram вам потребуется:

1. Создать бота через @BotFather
2. Настроить команду /start для открытия веб-приложения
3. Указать URL вашего деплоя на GitHub Pages в настройках бота

Пример команды для BotFather:
```
/setmenubutton
```

URL: https://ваш-логин.github.io/tg-shop-webapp/

## Структура проекта

```
src/
  ├── components/     # Компоненты React
  ├── pages/          # Страницы приложения
  ├── styles/         # Глобальные стили
  ├── App.tsx         # Главный компонент
  ├── main.tsx        # Точка входа
  └── telegram.d.ts   # Типы для Telegram Web App API
```

## Лицензия

MIT 