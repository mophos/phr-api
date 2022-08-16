import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();

import User = require('../models/personal_information');
import { AlgorithmModel } from '../models/algorithm';

const algoritm = new AlgorithmModel();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});


export default router;