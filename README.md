# Проект: Movies

Проект на GitHub Pages https://alinazavalii20.github.io/movies-explorer-api/

### Функциональность проекта.

  - Регистрация и авторизация пользователей
  - Изменение данных пользователя
  - Добавление фильмов
  - Удаление фильмов 

**API**
  - *Создаёт пользователя с переданными в теле*

  POST /signup

  - *Проверяет переданные в теле почту и пароль*

  POST /signin 

  - *Возвращает информацию о пользователе (email и имя)*

  GET /users/me

  - *Обновляет информацию о пользователе (email и имя)*

  PATCH /users/me

  - *Возвращает все сохранённые текущим  пользователем фильмы*

  GET /movies

  - *Создаёт фильм с переданными в теле(country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId)*

  POST /movies

  - *Удаляет сохранённый фильм по id*

  DELETE /movies/_id

**Используются в создании проекта:** 

  - JavaScript
  - Node
  - Express
  - MongoDB 

**Запуск проекта:** 

  npm install(npm i) установка зависимостей в проекте

  npm run start запуск сервера

  npm run dev запуск сервера с hot reload
