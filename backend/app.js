
var { indexRouter, userRouter, joinRouter, projectRouter } = require('./router.js');
var logger = require('morgan');
var express = require('express');
var app = express();
app.listen(5000)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(logger(":remote-addr"), function(req, res, next){
    next();
});
app.use(logger(":method"), function(req, res, next){
next();
});
app.use(logger(":url"), function(req, res, next){
next();
});
app.use(logger(":date"), function(req, res, next){
next();
});
app.use(logger(":status"), function(req, res, next){
next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/join', joinRouter);
app.use('/project', projectRouter);