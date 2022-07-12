/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import PersonalInformation = require('../../models/personal_information');
import PersonalInformationAddress = require('../../models/personal_information_address');
import PersonalVisit = require('../../models/personal_visit');
import PersonalVisitLabDiagnosis = require('../../models/personal_visit_diagnosis');
import PersonalVisitLabDiagnosisInformation = require('../../models/personal_visit_diagnosis_information');
import PersonalVisitInformation = require('../../models/personal_visit_information');
import PersonalVisitLab = require('../../models/personal_visit_lab');
import PersonalVisitLabInformation = require('../../models/personal_visit_lab_information');
import PersonalVisitOrder = require('../../models/personal_visit_order');

const router: Router = Router();
// import User = require('../../models/users');

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.post('/personal/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.pid = i.pid;
        obj.birthday = i.birthda;
        obj.blood_group = i.blood_group;
        obj.prename = i.prename;
        obj.first_name = i.first_name;
        obj.middle_name = i.middle_name;
        obj.last_name = i.last_name;
        obj.home_phone = i.home_phone;
        obj.phone_number = i.phone_number;
        obj.nationality = i.nationality;
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalInformation.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.pid = data.pid;
      obj.birthday = data.birthda;
      obj.blood_group = data.blood_group;
      obj.prename = data.prename;
      obj.first_name = data.first_name;
      obj.middle_name = data.middle_name;
      obj.last_name = data.last_name;
      obj.home_phone = data.home_phone;
      obj.phone_number = data.phone_number;
      obj.nationality = data.nationality;
      obj.source = decoded.source;
      await PersonalInformation.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/information/address', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.pid = i.pid;
        obj.house_no = i.house_no;
        obj.village_no = i.village_no;
        obj.alley = i.alley;
        obj.lane = i.lane;
        obj.road = i.road;
        obj.sub_district = i.sub_district;
        obj.district = i.district;
        obj.province = i.province;
        obj.postal_code = i.postal_code;
        obj.full_address = i.full_address;
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalInformationAddress.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.pid = data.pid;
      obj.house_no = data.house_no;
      obj.village_no = data.village_no;
      obj.alley = data.alley;
      obj.lane = data.lane;
      obj.road = data.road;
      obj.sub_district = data.sub_district;
      obj.district = data.district;
      obj.province = data.province;
      obj.postal_code = data.postal_code;
      obj.full_address = data.full_address;
      obj.source = decoded.source;
      await PersonalInformationAddress.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = i.pid;
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisit.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = data.pid;
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      await PersonalVisit.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.visit_no = i.visit_no;
        obj.pid = i.pid;
        obj.bmi = i.bmi;
        obj.bp = i.bp;
        obj.bt = i.bt;
        obj.bw = i.bw;
        obj.cc = i.cc;
        obj.ht = i.ht;
        obj.pe = i.pe;
        obj.pi = i.pi;
        obj.pr = i.pr;
        obj.rr = i.rr;
        obj.sat_o2 = i.sat_o2;
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisitInformation.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.visit_no = data.visit_no;
      obj.pid = data.pid;
      obj.bmi = data.bmi;
      obj.bp = data.bp;
      obj.bt = data.bt;
      obj.bw = data.bw;
      obj.cc = data.cc;
      obj.ht = data.ht;
      obj.pe = data.pe;
      obj.pi = data.pi;
      obj.pr = data.pr;
      obj.rr = data.rr;
      obj.sat_o2 = data.sat_o2;
      obj.source = decoded.source;
      await PersonalVisitInformation.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/lab', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = i.pid;
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisitLab.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = data.pid;
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      await PersonalVisitLab.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/lab/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.lab_code = i.lab_code;
        obj.lab_detail = i.lab_detail;
        obj.lab_order_name = i.lab_order_name;
        obj.reporter_name = i.reporter_name;
        obj.pid = i.pid;
        obj.visit_no = i.visit_no;
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisitLabInformation.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.lab_code = data.lab_code;
      obj.lab_detail = data.lab_detail;
      obj.lab_order_name = data.lab_order_name;
      obj.reporter_name = data.reporter_name;
      obj.pid = data.pid;
      obj.visit_no = data.visit_no;
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.source = decoded.source;
      await PersonalVisitLabInformation.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/diagnosis', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = i.pid;
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisitLabDiagnosis.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = data.pid;
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      await PersonalVisitLabDiagnosis.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/diagnosis/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = i.pid;
        obj.visit_no = i.visit_no
        obj.diagnosis_code = i.diagnosis_code;
        obj.diagnosis_result = i.diagnosis_result;
        obj.diagnosis_date = i.diagnosis_date;
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisitLabDiagnosisInformation.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = data.pid;
      obj.visit_no = data.visit_no
      obj.diagnosis_code = data.diagnosis_code;
      obj.diagnosis_result = data.diagnosis_result;
      obj.diagnosis_date = data.diagnosis_date;
      obj.source = decoded.source;
      await PersonalVisitLabDiagnosisInformation.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});


router.post('/personal/visit/order', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = i.pid;
        obj.visit_no = i.visit_no
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisitOrder.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = data.pid;
      obj.visit_no = data.visit_no
      obj.source = decoded.source;
      await PersonalVisitOrder.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});

router.post('/personal/visit/order/information', async (req: Request, res: Response) => {
  try {
    const decoded: any = req.decoded;
    const data: any = req.body;
    if (Array.isArray(data)) {
      const array = [];
      for (const i of data) {
        const obj: any = {};
        obj.visit_date = i.visit_date;
        obj.visit_time = i.visit_time;
        obj.hospcode = i.hospcode;
        obj.hospname = i.hospname;
        obj.pid = i.pid;
        obj.visit_no = i.visit_no
        obj.med_code = i.med_code;
        obj.med_name = i.med_name;
        obj.verify_date = i.verify_date;
        obj.source = decoded.source;
        array.push(obj);
      }
      await PersonalVisitOrder.insertMany(array);
      res.send({ ok: true, message: `Save success ${array.length} record` });
    } else {
      const obj: any = {};
      obj.visit_date = data.visit_date;
      obj.visit_time = data.visit_time;
      obj.hospcode = data.hospcode;
      obj.hospname = data.hospname;
      obj.pid = data.pid;
      obj.visit_no = data.visit_no
      obj.med_code = data.med_code;
      obj.med_name = data.med_name;
      obj.verify_date = data.verify_date;
      obj.source = decoded.source;
      await PersonalVisitOrder.insertMany(obj);
      res.send({ ok: true, message: 'Save success', data: obj });
    }

  } catch (error) {
    res.send({ ok: false, message: 'Save Error' });
  }
});


export default router;