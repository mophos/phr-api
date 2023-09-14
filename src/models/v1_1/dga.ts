var axios = require("axios").default;
import { Knex } from 'knex';
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
export class DgaModel {


  getKey(jwksUri) {
    const client = jwksClient({ jwksUri });
    return new Promise((resolve, reject) => {
      client.getSigningKey(jwksUri.kid, (err, key) => {
        if (err) {
          console.log(err);
          resolve(err);
        }
        resolve(key.publicKey || key.rsaPublicKey)
      });
    })
  }

  callJwk() {
    var options = {
      method: 'GET',
      url: `https://connect.dga.or.th/.well-known/openid-configuration`
    };
    return new Promise((resolve, reject) => {
      axios.request(options).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    })
  }



}
