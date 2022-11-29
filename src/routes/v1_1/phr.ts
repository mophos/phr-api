
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

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});


router.get('/info', async (req: Request, res: Response) => {
  try {
    const appId = req.decoded.app_id;
    const key: any = await Users.find({ app_id: appId });
    if (key) {
      //### PID ##########
      const cid: any = req.query.cid;
      const cidAPIHash: any = await PersonThaiCitizenHash.find({ cid_hash: cid }, { _id: 0, cid: 1 });
      if (cidAPIHash[0]) {
        const hashCidDB = await algoritm.hashCidDB(cidAPIHash[0].cid);
        const _healthId: any = await PersonThaiCitizen.find({ cid_hash: hashCidDB }, { _id: 0, health_id: 1 });
        const healthId = _healthId[0].health_id
        console.log(hashCidDB, healthId);

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
            "death":info[0].death,
            "telephone":info[0].telephone,
            "email":info[0].email,
          };
          const data:any = {};
          data.profile = profile;
          data.services=service;
          res.status(200)
          // res.send(obj);
          res.send({ ok: true, data: data });
          // res.send({ ok: true, data: algoritm.enCryptAES(JSON.stringify(data), key[0].key, key[0].iv) });
        }else{
          res.status(204)
          res.send();
        }
        // obj.personal_infomation = {
        //   "birthday": await algoritm.deCryptAES(info[0].birthday),
        //   "blood_group": info[0].blood_group,
        //   "prename": info[0].prename,
        //   "first_name": await algoritm.deCryptAES(info[0].first_name),
        //   "middle_name": await algoritm.deCryptAES(info[0].middle_name),
        //   "last_name": await algoritm.deCryptAES(info[0].last_name),
        //   "home_phone": info[0].home_phone,
        //   "phone_number": info[0].phone_number,
        //   "nationality": info[0].nationality,
        //   "source": info[0].source
        // }
        // obj.personal_infomation_address = infoAddress;
        // obj.personal_visit = visit
        // obj.personal_visit_information = visitInfo
        // obj.personal_visit_diagnosis = visitDiagnosis
        // obj.personal_visit_diagnosis_information = visitDiagnosisInfo
        // obj.personal_visit_lab = visitLab
        // obj.personal_visit_lab_information = visitLabInfo
        // obj.personal_visit_order = visitOrder
        // obj.personal_visit_order_information = visitOrderInfo
        // obj.personal_visit_appointment = appointment

        // console.log(rs);

      
      } else {
        res.status(204)
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



export default router;