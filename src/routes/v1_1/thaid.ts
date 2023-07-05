
/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import Users = require('../../models/v1_1/users');
import { ThaidModel } from '../../models/v1_1/thaid';

const { uuid } = require('uuidv4');

const thaidModel = new ThaidModel();
const router: Router = Router();


router.get('/blood_pressure', async (req: Request, res: Response) => {
  try {
    const db = req.mysql;
    const limit = req.query.limit || 0;
    const rs: any = await thaidModel.getBloodPressure(db, req.decoded.sub, +limit);
    if (rs.length) {
      res.send({ ok: true, rows: rs });
    } else {
      res.status(204);
      res.send({ ok: true })
    }
  } catch (error) {
    res.status(500);
    res.send({ ok: false, error: error });

  }
});

router.get('/diabetes', async (req: Request, res: Response) => {
  try {
    const db = req.mysql;
    const limit = req.query.limit || 0;
    const rs: any = await thaidModel.getDiabetes(db, req.decoded.sub, +limit);
    if (rs.length) {
      res.send({ ok: true, rows: rs });
    } else {
      res.status(204);
      res.send({ ok: true })
    }
  } catch (error) {
    res.status(500);
    res.send({ ok: false, error: error });
  }
});

router.get('/drug_allergy', async (req: Request, res: Response) => {
  try {
    const db = req.mysql;
    const limit = req.query.limit || 0;
    const rs: any = await thaidModel.getDrugAllergy(db, req.decoded.sub, +limit);
    if (rs.length) {
      res.send({ ok: true, rows: rs });
    } else {
      res.status(204);
      res.send({ ok: true })
    }
  } catch (error) {
    res.status(500);
    res.send({ ok: false, error: error });
  }
});

router.get('/hospital_visit', async (req: Request, res: Response) => {
  try {
    const db = req.mysql;
    const limit = req.query.limit || 0;
    const rs: any = await thaidModel.getHospitalVisit(db, req.decoded.sub, +limit);
    if (rs.length) {
      res.send({ ok: true, rows: rs });
    } else {
      res.status(204);
      res.send({ ok: true })
    }
  } catch (error) {
    res.status(500);
    res.send({ ok: false, error: error });
  }
});

export default router;