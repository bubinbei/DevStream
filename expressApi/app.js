var createError = require('http-errors'); // Модуль для создания HTTP-ошибок.
var express = require('express'); // Основной модуль Express.js.
var path = require('path'); // Модуль для работы с путями.
var cookieParser = require('cookie-parser'); // Middleware для парсинга куки.
var logger = require('morgan'); // Middleware для логирования HTTP-запросов (в данном случае используется morgan).

var indexRouter = require('./routes/index'); // Маршруты для основной страницы.
var usersRouter = require('./routes/users'); // Маршруты для пользователей.

var app = express(); // Экземпляр приложения Express.

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Устанавливает путь к директории с шаблонами.
app.set('view engine', 'jade'); // Устанавливает шаблонизатор (в данном случае jade, который теперь называется pug).

app.use(logger('dev')); // Middleware для логирования запросов.
app.use(express.json()); // Middleware для парсинга JSON-запросов.
app.use(express.urlencoded({ extended: false })); // Middleware для парсинга URL-кодированных запросов.
app.use(cookieParser()); // Middleware для парсинга куки.
app.use(express.static(path.join(__dirname, 'public'))); // Middleware для обслуживания статических файлов из директории public.

app.use('/', indexRouter); // Использует маршруты для основной страницы.
app.use('/users', usersRouter); // Использует маршруты для пользователей.

// Middleware для перехвата запросов, которые не соответствуют 
// ни одному маршруту, и передачи их в обработчик ошибок.
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; // Устанавливает сообщение об ошибке.

  // Устанавливает объект ошибки, если приложение работает в режиме разработки.
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); //Устанавливает статус ответа.
  res.render('error'); // Рендерит страницу ошибки.
});

module.exports = app;
