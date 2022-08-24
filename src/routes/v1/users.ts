
/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import Users = require('../../models/users');
import { AlgorithmModel } from '../../models/algorithm';
import { Jwt } from '../../models/jwt';
const { uuid } = require('uuidv4');

const algoritm = new AlgorithmModel();
const jwt = new Jwt();
const router: Router = Router();
// import User = require('../../models/users');

router.post('/', async (req: Request, res: Response) => {
  try {
    const appId = req.decoded.app_id;
    if (appId == 'a1443583-90e0-4020-b4ae-634098f09ab7') {
      const app_id: any = uuid();
      const key = await makeid(32);
      const iv = await makeid(16);
      const obj: any = {
        app_id: app_id,
        name: req.body.name,
        key: key,
        iv: iv,
        is_actived: true
      }
      const payload: any = {
        app_id: uuid,
        name: req.body.name,
        is_actived: true
      }
      const token = jwt.sign(payload);
      await Users.insertMany(obj);
      res.send({ ok: true, token: token, key, iv });
    } else {
      res.status(401);
      res.send({ ok: false });
    }

  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ ok: false });

  }
});

router.get('/token', async (req: Request, res: Response) => {
  try {
    const appId = req.decoded.app_id;
    if (appId == 'a1443583-90e0-4020-b4ae-634098f09ab7') {
      const rs = await Users.find({ name: req.query.name });

      const payload: any = {
        app_id: rs[0].app_id,
        name: rs[0].name,
        is_actived: true
      }
      const token = jwt.signNoExpire(payload);
      res.send({ ok: true, token: token, key: rs[0].key, iv: rs[0].iv });
    } else {
      res.status(401);
      res.send({ ok: false });
    }

  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ ok: false });

  }
});

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
export default router;