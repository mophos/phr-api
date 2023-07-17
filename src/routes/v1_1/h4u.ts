
/// <reference path="../../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import Users = require('../../models/v1_1/users');
import { H4uModel } from '../../models/v1_1/h4u';

const { uuid } = require('uuidv4');

const h4uModel = new H4uModel();
const router: Router = Router();


router.get('/blood_pressure', async (req: Request, res: Response) => {
  try {
    const db = req.mysql;
    const limit = req.query.limit || 0;
    const rs: any = await h4uModel.getBloodPressure(db, req.decoded.cid, +limit);
    if (rs.length) {
      if (rs[0].history) {
        res.send({ ok: true, rows: JSON.parse(rs[0].history) });
      } else {
        res.status(204);
        res.send({ ok: true })
      }
      res.send({ ok: true, rows: rs[0] });
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
    const rs: any = await h4uModel.getDiabetes(db, req.decoded.cid, +limit);
    if (rs.length) {
      if (rs[0].history) {
        res.send({ ok: true, rows: JSON.parse(rs[0].history) });
      } else {
        res.status(204);
        res.send({ ok: true })
      }
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
    const rs: any = await h4uModel.getDrugAllergy(db, req.decoded.cid, +limit);
    if (rs.length) {
      if (rs[0].drug_name) {
        res.send({ ok: true, rows: JSON.parse(rs[0].drug_name) });
      } else {
        res.status(204);
        res.send({ ok: true })
      }
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
    const rs: any = await h4uModel.getHospitalVisit(db, req.decoded.cid, +limit);
    if (rs.length) {
      if (rs[0].history) {
        res.send({ ok: true, rows: JSON.parse(rs[0].history) });
      } else {
        res.status(204);
        res.send({ ok: true })
      }
    } else {
      res.status(204);
      res.send({ ok: true })
    }
  } catch (error) {
    res.status(500);
    res.send({ ok: false, error: error });
  }
});

function stripSlashes(value: string) {
  return value.replace(/\\(.)/mg, "$1");
}

export default router;