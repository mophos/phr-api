
/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import PersonalInformation = require('../../models/personal_information');
import PersonalInformationAddress = require('../../models/personal_information_address');
import PersonalPid = require('../../models/personal_pid');
import PersonalVisit = require('../../models/personal_visit');
import PersonalVisitDiagnosis = require('../../models/personal_visit_diagnosis');
import PersonalVisitDiagnosisInformation = require('../../models/personal_visit_diagnosis_information');
import PersonalVisitInformation = require('../../models/personal_visit_information');
import PersonalVisitLab = require('../../models/personal_visit_lab');
import PersonalVisitLabInformation = require('../../models/personal_visit_lab_information');
import PersonalVisitOrder = require('../../models/personal_visit_order');
import PersonalVisitOrderInformation = require('../../models/personal_visit_order_information');
import { AlgorithmModel } from './../../models/algorithm';

const algoritm = new AlgorithmModel();
const router: Router = Router();
// import User = require('../../models/users');

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});


router.get('/info', async (req: Request, res: Response) => {
  try {
    //### PID ##########
    const pid: any = req.query.pid;
    const pidAPIHash: any = await PersonalPid.find({ pid_api: pid }, { _id: 0, pid: 1 });
    const hashCidDB = await algoritm.hashCidDB(pidAPIHash[0].pid);
    //##################
    const info: any = await PersonalInformation.find({ pid: hashCidDB }, { _id: 0 });
    const infoAddress: any = await PersonalInformationAddress.find({ pid: hashCidDB }, { _id: 0 });

    const visit: any = await PersonalVisit.find({ pid: hashCidDB }, { _id: 0 });
    const visitInfo: any = await PersonalVisitInformation.find({ pid: hashCidDB }, { _id: 0 });
    const visitDiagnosis: any = await PersonalVisitDiagnosis.find({ pid: hashCidDB }, { _id: 0 });
    const visitDiagnosisInfo: any = await PersonalVisitDiagnosisInformation.find({ pid: hashCidDB }, { _id: 0 });
    const visitLab: any = await PersonalVisitLab.find({ pid: hashCidDB }, { _id: 0 });
    const visitLabInfo: any = await PersonalVisitLabInformation.find({ pid: hashCidDB }, { _id: 0 });
    const visitOrder: any = await PersonalVisitOrder.find({ pid: hashCidDB }, { _id: 0 });
    const visitOrderInfo: any = await PersonalVisitOrderInformation.find({ pid: hashCidDB }, { _id: 0 });

    const obj: any = {};
    obj.personal_infomation = {
      "birthday": await algoritm.deCryptAES(info[0].birthday),
      "blood_group": info[0].blood_group,
      "prename": info[0].prename,
      "first_name": await algoritm.deCryptAES(info[0].first_name),
      "middle_name": await algoritm.deCryptAES(info[0].middle_name),
      "last_name": await algoritm.deCryptAES(info[0].last_name),
      "home_phone": info[0].home_phone,
      "phone_number": info[0].phone_number,
      "nationality": info[0].nationality,
      "source": info[0].source
    }
    obj.personal_infomation_address = infoAddress;
    obj.personal_visit = visit
    obj.personal_visit_information = visitInfo
    obj.personal_visit_diagnosis = visitDiagnosis
    obj.personal_visit_diagnosis_information = visitDiagnosisInfo
    obj.personal_visit_lab = visitLab
    obj.personal_visit_lab_information = visitLabInfo
    obj.personal_visit_order = visitOrder
    obj.personal_visit_order_information = visitOrderInfo

    // console.log(rs);

    res.send({ ok: true, rows: obj });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error });
  }
});

router.get('/pid-from-visit', async (req: Request, res: Response) => {
  try {
    //### PID ##########
    const hospcode: any = req.query.hospcode;
    const hn: any = req.query.hn;
    const visit: any = await PersonalVisit.findOne({ hospcode: hospcode, hn: hn }, { _id: 0 });
    if (visit) {
      console.log(visit.pid);
      res.status(200);
      res.send(algoritm.enCryptAES(visit.pid, process.env.NIFI_AES_KEY, process.env.NIFI_AES_IV));
    } else {
      res.status(204);
      res.send();
    }
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send({ ok: false, error: error });
  }
});



export default router;