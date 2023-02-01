var safeSiteList = ['http://localhost:8080']
var corsOptions = {
    origin: function(origin, callback) {
        var isSafeSite = safeSiteList.indexOf(origin) !== -1;
        callback(null, isSafeSite);
    },
    credentials: true
}
var router = require('./routers');
var logger = require('morgan');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var rawReq = require('./middlewares/logRawReq');
const swaggerUi = require("swagger-ui-express");
const yaml = require('yamljs');
const specs = yaml.load('./swagger.yml');

var app = express();
app.listen(5000);
// app.use(rawReq);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs')
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
app.use('/', router)