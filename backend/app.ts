import express, { Express, Request, Response} from "express"
import dotenv from 'dotenv'

const app: Express = express();
const port = 5000;

app.get("/", (req : express.Request, res : express.Response) => {
    console.log(req);
    res.send("start");
})

app.listen(5000, () => console.log("start"));

var safeSiteList = ['http://localhost:8080']
var corsOptions = {
    origin: function(origin : any, callback : any) {
        var isSafeSite = safeSiteList.indexOf(origin) !== -1;
        callback(null, isSafeSite);
    },
    credentials: true
}
var router = require('./routers');
var logger = require('morgan');
// var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var rawReq = require('./middlewares/logRawReq');
const swaggerUi = require("swagger-ui-express");
const yaml = require('yamljs');
const specs = yaml.load('./swagger.yml');

// var app = express();
// app.listen(5000);
// app.use(rawReq);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(logger(":remote-addr"), function(req : Request, res : Response, next){
    next();
});
app.use(logger(":method"), function(req : Request, res : Response, next){
next();
});
app.use(logger(":url"), function(req : Request, res : Response, next){
next();
});
app.use(logger(":date"), function(req : Request, res : Response, next){
next();
});
app.use(logger(":status"), function(req : Request, res : Response, next){
next();
});
app.use('/', router)