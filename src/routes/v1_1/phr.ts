
/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import PersonInfo = require('../../models/v1_1/person_info');
import Services = require('../../models/v1_1/services');
import PersonThaiCitizenHash = require('../../models/v1_1/person_thai_citizen_hash');
// import Users = require('../../models/v1_1/users');
import { AlgorithmModel } from '../../models/v1_1/algorithm';

const algoritm = new AlgorithmModel();
const router: Router = Router();
import Users = require('../../models/v1_1/users');
import PersonThaiCitizen = require('../../models/v1_1/person_thai_citizen');
import PersonVitalSign = require('../../models/v1_1/person_vitalsign');
const { v4 } = require('uuid');

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/health_id', async (req: Request, res: Response) => {
  try {
    const appId = req.decoded.app_id;
    const key: any = await Users.find({ app_id: appId });
    if (key) {
      const cid: any = req.query.cid;
      const hashCidAPI: any = await algoritm.hashCidAPI(cid.toString());
      const hashCidDB = await algoritm.hashCidDB(cid);
      const _healthId: any = await PersonThaiCitizen.find({ cid_hash: hashCidDB }, { _id: 0, health_id: 1 });
      if (_healthId.length) {
        const healthId = _healthId[0].health_id
        res.send({ ok: true, healthId: healthId });
      } else {
        const healthId = v4();
        await PersonThaiCitizenHash.insertMany({ cid, cid_hash: hashCidAPI });
        console.log(cid, hashCidAPI);
        await PersonThaiCitizen.insertMany({ cid_hash: hashCidDB, health_id: healthId });
        res.send({ ok: true, healthId: healthId });
      }
    } else {
      res.status(401)
      res.send({ ok: false, error: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error });
  }
});

router.get('/vitalsign', async (req: Request, res: Response) => {
  try {
    const appId = req.decoded.app_id;
    const key: any = await Users.find({ app_id: appId });
    if (key) {
      const healthId: any = req.query.healthId;
      const limit = req.query.limit || 0;
      const rs: any = await PersonVitalSign.find({ 'health_id': healthId }, { _id: 0, created_date: 0 }).sort({ datetime: -1 }).limit(+limit);
      if (rs.length) {
        res.status(200)
        res.send(rs);
      } else {
        res.status(204);
        res.send();
      }
    } else {
      res.status(401)
      res.send({ ok: false, error: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error });
  }
});

router.get('/info', async (req: Request, res: Response) => {
  try {
    const appId = req.decoded.app_id;
    const key: any = await Users.find({ app_id: appId });
    if (key) {
      //### PID ##########
      const cid: any = req.query.cid;
      if (typeof cid == 'string') {
        const rs: any = await getInfo(key, cid)
        if (rs) {
          res.send({ ok: true, rows: rs });
        } else {
          res.status(204);
          res.send();
        }
      } else {
        const data = [];
        for (const c of cid) {
          const rs: any = await getInfo(key, c);
          data.push(rs)
        }
        if (data.length) {
          res.send({ ok: true, rows: data });
        } else {
          res.status(204);
          res.send();
        }
      }

    }
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error });
  }
});

async function getInfo(key, cid) {
  const cidAPIHash: any = await PersonThaiCitizenHash.find({ cid_hash: cid }, { _id: 0, cid: 1 });
  if (cidAPIHash[0]) {
    const hashCidDB = await algoritm.hashCidDB(cidAPIHash[0].cid);
    const _healthId: any = await PersonThaiCitizen.find({ cid_hash: hashCidDB }, { _id: 0, health_id: 1 });
    const healthId = _healthId[0].health_id
    //##################
    console.time('info')
    const info: any = await PersonInfo.find({ health_id: healthId }, { _id: 0 });
    const service: any = await Services.find({ health_id: healthId }, { _id: 0 });
    console.timeEnd('info')
    if (info.length) {
      const profile: any = {
        "birthdate": await algoritm.deCryptAES(info[0].birthdate),
        "gender_code": info[0].gender_code,
        "gender_name": info[0].gender_name,
        "rh_blood_group": info[0].rh_blood_group,
        "blood_group": info[0].blood_group,
        "title_code": info[0].title_code,
        "title_name": info[0].title_name,
        "first_name": await algoritm.deCryptAES(info[0].first_name),
        "middle_name": await algoritm.deCryptAES(info[0].middle_name),
        "last_name": await algoritm.deCryptAES(info[0].last_name),
        "nationality_code": info[0].nationality_code,
        "nationality_name": info[0].nationality_name,
        "marital_status_code": info[0].marital_status_code,
        "marital_status_name": info[0].marital_status_name,
        "viability_code": info[0].viability_code,
        "viability_name": info[0].viability_name,
        "death": info[0].death,
        "telephone": info[0].telephone,
        "email": info[0].email,
      };
      const data: any = {};
      data.profile = profile;
      data.services = service;


      if (process.env.NODE_ENV == 'DEV') {
        return data;
      } else {
        return algoritm.enCryptAES(JSON.stringify(data), key[0].key, key[0].iv)
      }
    } else {
      return null
    }
  } else {
    return null;
  }
}



export default router;