import * as jwt from 'jsonwebtoken';
const crypto = require("crypto");
const CryptoJS = require("crypto-js");

export class AlgorithmModel {
  private secretKey = process.env.SECRET_KEY;

  hashCidAPI(cid: string) {
    if (cid.length == 13) {
    const md5Hash1 = CryptoJS.MD5(cid);
    const md5Hash1String = md5Hash1.toString()
    console.log(md5Hash1String);
    const subSwitch = `${cid.substring(0, 2)}${md5Hash1String}${cid.substring(cid.length-2, cid.length)}`
    return subSwitch
    } else {
      return null
    }
  }


}