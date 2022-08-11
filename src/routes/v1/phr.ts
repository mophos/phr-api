
/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import PersonalInformation = require('../../models/personal_information');
import PersonalInformationAddress = require('../../models/personal_information_address');
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


router.get('/', async (req: Request, res: Response) => {
  try {
    const pid = req.query.pid;
    const info: any = await PersonalInformation.find({ pid: pid }, { _id: 0 });
    const infoAddress: any = await PersonalInformationAddress.find({ pid: pid }, { _id: 0 });
    const visit: any = await PersonalVisit.find({ pid: pid }, { _id: 0 });
    const visitInfo: any = await PersonalVisitInformation.find({ pid: pid }, { _id: 0 });
    const visitDiagnosis: any = await PersonalVisitDiagnosis.find({ pid: pid }, { _id: 0 });
    const visitDiagnosisInfo: any = await PersonalVisitDiagnosisInformation.find({ pid: pid }, { _id: 0 });
    const visitLab: any = await PersonalVisitLab.find({ pid: pid }, { _id: 0 });
    const visitLabInfo: any = await PersonalVisitLabInformation.find({ pid: pid }, { _id: 0 });
    const visitOrder: any = await PersonalVisitOrder.find({ pid: pid }, { _id: 0 });
    const visitOrderInfo: any = await PersonalVisitOrderInformation.find({ pid: pid }, { _id: 0 });
    const obj: any = {};
    obj.personal_infomation = info[0];
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
    res.send({ ok: false, error: error });
  }
});



export default router;