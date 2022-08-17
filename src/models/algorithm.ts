import * as jwt from 'jsonwebtoken';
const crypto = require("crypto");
const CryptoJS = require("crypto-js");

export class AlgorithmModel {
  private secretKey = process.env.SECRET_KEY;

  hashCidAPI(cid: string) {
    if (cid.length == 13) {
      const md5Hash1 = CryptoJS.MD5(cid);
      const md5Hash1String = md5Hash1.toString();
      const subSwitch = `${cid.substring(0, 2)}${md5Hash1String}${cid.substring(cid.length - 2, cid.length)}`
      return subSwitch
    } else {
      return null
    }
  }

  hashCidDB(cid: string) {
    if (cid.length == 13) {
      const sumCid: number = parseInt(cid[0]) + parseInt(cid[1]) + parseInt(cid[2]) + parseInt(cid[3]) + parseInt(cid[4]) + parseInt(cid[5]) + parseInt(cid[6]) + parseInt(cid[7]) + parseInt(cid[8]) + parseInt(cid[9]) + parseInt(cid[10]) + parseInt(cid[11]) + parseInt(cid[12]);
      const cidMergeSum = `${cid}_${sumCid}`;
      // const md5Hash1 = crypto.createHmac("md5", cidMergeSum);
      const md5Hash1 = CryptoJS.MD5(cidMergeSum);
      const md5Hash1String = md5Hash1.toString();
      const subSwitch = `${md5Hash1String.substring(md5Hash1String.length - 2, md5Hash1String.length)}${md5Hash1String.substring(2, md5Hash1String.length - 2)}${md5Hash1String.substring(0, 2)}${cid.substring(cid.length - 2, cid.length)}`
      return subSwitch
    } else {
      return null
    }
  }

  deCryptAES(text) {
    if (text == null || text == "" || text == undefined) {
      return null
    } else {

      const ENC_KEY = process.env.ENC_KEY
      const IV = process.env.IV
      var decrypt = ((encrypted) => {
        let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
        let decrypted = decipher.update(encrypted, 'base64', 'utf8');
        return (decrypted + decipher.final('utf8'));
      });

      return decrypt(text);
    }
  }

  enCryptAES(text, key, iv) {
    if (text == null || text == "" || text == undefined) {
      return null
    } else {

      var encrypt = ((val) => {
        let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(val, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
      });

      return encrypt(text);
    }
  }

}