/// <reference path="../../typings.d.ts" />

import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

// import { Jwt } from '../models/jwt';

// const jwt = new Jwt();

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {

});

export default router;