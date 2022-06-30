# Проект: Movies

Проект на GitHub Pages https://alinazavalii20.github.io/movies-explorer-api/

### Функциональность проекта.

  - Регистрация и авторизация пользователей
  - Изменение данных пользователя
  - Добавление фильмов
  - Удаление фильмов 

**API**

POST /signup
  - *Создаёт пользователя с переданными в теле*

 POST /signin
  - *Проверяет переданные в теле почту и пароль*

 
  GET /users/me
  - *Возвращает информацию о пользователе (email и имя)*


  PATCH /users/me
  - *Обновляет информацию о пользователе (email и имя)*


  GET /movies
  - *Возвращает все сохранённые текущим  пользователем фильмы*


POST /movies
  - *Создаёт фильм с переданными в теле(country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId)*


  DELETE /movies/_id
  - *Удаляет сохранённый фильм по id*


**Используются в создании проекта:** 

  - JavaScript
  - Node
  - Express
  - MongoDB 

**Запуск проекта:** 

  npm install(npm i) установка зависимостей в проекте

  npm run start запуск сервера

  npm run dev запуск сервера с hot reload
  
  **Ссылка на домен Backend**
  
  https://api.alina.movies.nomoreparties.sbs/
  
  *Публичный IP-адрес сервера:* 51.250.30.128
