import { ThaidModel } from './models/v1_1/thaid';
/// <reference path="../typings.d.ts" />

require('dotenv').config();
var mongoose = require('mongoose');

import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import * as cors from 'cors';

import { Router, Request, Response, NextFunction } from 'express';
import { Jwt } from './models/v1/jwt';

import indexRoute from './routes/index';
import loginRoute from './routes/login';
import phrV1Route from './routes/v1/phr';
import userV1Route from './routes/v1/users';

import phrV1_1Route from './routes/v1_1/phr';
import thaidV1_1Route from './routes/v1_1/thaid';

// Assign router to the express.Router() instance
const app: express.Application = express();

const jwt = new Jwt();
const thaidModel = new ThaidModel();
//view engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('.ejs', ejs.renderFile);
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'../public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());


const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME
  },
  pool: {
    min: 0,
    max: 100,
    afterCreate: (conn, done) => {
      conn.query('SET NAMES utf8', (err) => {
        done(err, conn);
      });
    }
  },
  debugger: false
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.mysql = knex;
  next();
});

let checkAuth = (req: Request, res: Response, next: NextFunction) => {
  let token: any = null;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
      req.decoded = decoded;
      next();
    }, err => {
      return res.send({
        ok: false,
        error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
        code: HttpStatus.UNAUTHORIZED
      });
    });
}

let checkAuthThaiD = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      const rs: any = await thaidModel.tokenIntrospect(token);
      if (rs.active) {
        req.decoded = rs;
        next();
      } else {
        console.log('actived false');
        
        return res.send({
          ok: false,
          error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
          code: HttpStatus.UNAUTHORIZED
        });
      }
    } else {
      return res.send({
        ok: false,
        error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
        code: HttpStatus.UNAUTHORIZED
      });
    }

  } catch (error) {
    return res.send({
      ok: false,
      error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
      code: HttpStatus.UNAUTHORIZED
    });
  }
}

app.use('/v1_1/thaid', checkAuthThaiD, thaidV1_1Route);
app.use('/v1_1/users', checkAuth, userV1Route);
app.use('/v1_1/', checkAuth, phrV1_1Route);

app.use('/v1/', checkAuth, phrV1Route);
app.use('/v1/users', checkAuth, userV1Route);
app.use('/login', loginRoute);
app.use('/', indexRoute);

//error handlers

if (process.env.NODE_ENV === 'DEV') {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        ok: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    });
  });
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      ok: false,
      code: HttpStatus.NOT_FOUND,
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
});

export default app;
