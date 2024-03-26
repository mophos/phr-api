
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
import Drugstore = require('../../models/v1_1/drug_store');
const { v4 } = require('uuid');



router.get('/', async (req: Request, res: Response) => {
  try {
    const appId = req.decoded.app_id;
    const key: any = await Users.find({ app_id: appId });
    if (key) {
      //### PID ##########
      const ENTREPRENEUR_IDENTIFY: any = req.query.ENTREPRENEUR_IDENTIFY;
      const CTZNO_OPERATOR: any = req.query.CTZNO_OPERATOR;
      const cid: any = req.query.cid;
      if (typeof ENTREPRENEUR_IDENTIFY == 'string' || CTZNO_OPERATOR == 'string') {
        const rs: any = await getInfo(key, ENTREPRENEUR_IDENTIFY, CTZNO_OPERATOR)
        if (rs) {
          res.send({ ok: true, rows: rs });
        } else {
          res.status(204);
          res.send();
        }
      } else {
        res.status(400).send();
      }

    }
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error });
  }
});

async function getInfo(key, ENTREPRENEUR_IDENTIFY = '', CTZNO_OPERATOR = '') {
  // const info: any = await Drugstore.find({ 'LOCATION_INFO.PVCODE': "65" }, { _id: 0 });
  let info: any;
  if (ENTREPRENEUR_IDENTIFY.length && CTZNO_OPERATOR.length) {
    info = await Drugstore.find({ 'LOCATION_INFO.ENTREPRENEUR_IDENTIFY': ENTREPRENEUR_IDENTIFY, 'LOCATION_INFO.CTZNO_OPERATOR': CTZNO_OPERATOR }, { _id: 0 });
  } else if (CTZNO_OPERATOR.length) {
    info = await Drugstore.find({ 'LOCATION_INFO.CTZNO_OPERATOR': CTZNO_OPERATOR }, { _id: 0 });
  } else if (ENTREPRENEUR_IDENTIFY.length) {
    info = await Drugstore.find({ 'LOCATION_INFO.ENTREPRENEUR_IDENTIFY': ENTREPRENEUR_IDENTIFY }, { _id: 0 });
  } else {
    return null
  }
  // console.log(info);

  if (info.length) {
    if (process.env.NODE_ENV == 'DEV') {
      const data = [];
      for (const i of info) {
        const locationInfo = {
          "ENTREPRENEUR_IDENTIFY": i.LOCATION_INFO.ENTREPRENEUR_IDENTIFY,
          "ENTREPRENEUR_NAME": i.LOCATION_INFO.ENTREPRENEUR_NAME,
          "LOCATION_LICENSE": i.LOCATION_INFO.LOCATION_LICENSE,
          "LOCATION_NAME": i.LOCATION_INFO.LOCATION_NAME,
          "LOCATION_FULL_ADDR": i.LOCATION_INFO.LOCATION_FULL_ADDR,
          "ADDR_NO": i.LOCATION_INFO.ADDR_NO,
          "PROVINCE": i.LOCATION_INFO.PROVINCE,
          "DISTRICT": i.LOCATION_INFO.DISTRICT,
          "SubDISTRICT": i.LOCATION_INFO.SubDISTRICT,
          "ZIPCODE": i.LOCATION_INFO.ZIPCODE,
          "LATITUDE": i.LOCATION_INFO.LATITUDE,
          "LONGTITUDE": i.LOCATION_INFO.LONGTITUDE,
          "PROCESS_ID": i.LOCATION_INFO.PROCESS_ID,
          "TEL": i.LOCATION_INFO.TEL,
          "EMAIL": i.LOCATION_INFO.EMAIL,
          "HCODE": i.LOCATION_INFO.HCODE,
          "LOCATION_JOB_TIME": i.LOCATION_INFO.LOCATION_JOB_TIME,
          "DATA_LINKGATE": {
            "alleyCode": i.LOCATION_INFO.DATA_LINKGATE.alleyCode,
            "alleyDesc": i.LOCATION_INFO.DATA_LINKGATE.alleyDesc,
            "alleyWayCode": i.LOCATION_INFO.DATA_LINKGATE.alleyWayCode,
            "alleyWayDesc": i.LOCATION_INFO.DATA_LINKGATE.alleyWayDesc,
            "districtCode": i.LOCATION_INFO.DATA_LINKGATE.districtCode,
            "districtDesc": i.LOCATION_INFO.DATA_LINKGATE.districtDesc,
            "houseID": i.LOCATION_INFO.DATA_LINKGATE.houseID,
            "houseNo": i.LOCATION_INFO.DATA_LINKGATE.houseNo,
            "provinceCode": i.LOCATION_INFO.DATA_LINKGATE.provinceCode,
            "provinceDesc": i.LOCATION_INFO.DATA_LINKGATE.provinceDesc,
            "roadCode": i.LOCATION_INFO.DATA_LINKGATE.roadCode,
            "roadDesc": i.LOCATION_INFO.DATA_LINKGATE.roadDesc,
            "subdistrictCode": i.LOCATION_INFO.DATA_LINKGATE.subdistrictCode,
            "subdistrictDesc": i.LOCATION_INFO.DATA_LINKGATE.subdistrictDesc,
            "villageNo": i.LOCATION_INFO.DATA_LINKGATE.villageNo,
          }
        };
        const locationBsn = [];
        for (const b of i.LOCATION_BSN) {
          locationBsn.push({
            "CTZNO_OPERATOR": b.CTZNO_OPERATOR,
            "OPERATOR_NAME": b.OPERATOR_NAME
          })

        }
        data.push({
          LOCATION_INFO: locationInfo,
          LOCATION_BSN: locationBsn
        })
      }
      return data;
    } else {
      return algoritm.enCryptAES(JSON.stringify(info), key[0].key, key[0].iv)
    }
  } else {
    return null
  }

}



export default router;