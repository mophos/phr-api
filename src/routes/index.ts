import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();

import { AlgorithmModel } from '../models/v1/algorithm';

const algoritm = new AlgorithmModel();

router.get('/', async (req: any, res: Response) => {
  
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/version', async (req: Request, res: Response) => {
  // const rs0:any = await PersonalVisit.find({});
  // const rs:any = await Users.find({});
  // console.log(rs0[0]._doc);
  // console.log(rs[0]._doc);
  // const a = rs0[0]._doc;
  // console.log(a);

  // console.log(rs);

  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});


export default router;