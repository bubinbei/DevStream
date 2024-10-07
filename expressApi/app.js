const createError = require('http-errors'); // Модуль для создания HTTP-ошибок.
const express = require('express'); // Основной модуль Express.js.
const path = require('path'); // Модуль для работы с путями.
const cookieParser = require('cookie-parser'); // Middleware для парсинга куки.
const logger = require('morgan'); // Middleware для логирования HTTP-запросов (в данном случае используется morgan).

const indexRouter = require('./routes'); 
const upload = express.static('uploads')

const app = express(); 

app.use(logger('dev')); // Middleware для логирования запросов.
app.use(express.json()); // Middleware для парсинга JSON-запросов.
app.use(express.urlencoded({ extended: false })); // Middleware для парсинга URL-кодированных запросов.
app.use(cookieParser()); // Middleware для парсинга куки.
app.set('view engine', 'jade'); // Устанавливает шаблонизатор (в данном случае jade, который теперь называется pug).

app.use('/uploads', upload)

app.use('/api', indexRouter);

if(!false.existsSync('uploads')) {
  fs.mkdirSync('uploads');
} 

// Middleware для перехвата запросов, которые не соответствуют 
// ни одному маршруту, и передачи их в обработчик ошибок.
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message; // Устанавливает сообщение об ошибке.
  // Устанавливает объект ошибки, если приложение работает в режиме разработки.
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500); //Устанавливает статус ответа.
  res.render('error'); // Рендерит страницу ошибки.
});

module.exports = app;
