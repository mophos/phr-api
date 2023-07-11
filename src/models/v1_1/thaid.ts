var axios = require("axios").default;
import { Knex } from 'knex';
export class ThaidModel {


  tokenIntrospect(token: any) {
    var options = {
      method: 'POST',
      url: 'https://imauth.bora.dopa.go.th/api/v2/oauth2/introspect/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${process.env.THAID_BASIC}`
      },
      data: {
        token: `Bearer ${token}`
      }
    };
    return new Promise<void>((resolve, reject) => {
      axios.request(options).then(function (response) {
        resolve(response.data)
      }).catch(function (error) {
        reject(error.response.data)
      });
    })
  }

  getBloodPressure(db: Knex, cid, limit: number = 0) {
    const sql = db('blood_pressure')
      .select('hospname', 'date_serv', 'history')
      .where('cid', cid)
    if (limit) {
      sql.limit(limit)
    }
    return sql;
  }

  getDiabetes(db: Knex, cid, limit: number = 0) {
    const sql = db('diabetes')
      .select('hospname', 'date_serv', 'history')
      .where('cid', cid)
    if (limit) {
      sql.limit(limit)
    }
    return sql;
  }

  getDrugAllergy(db: Knex, cid, limit: number = 0) {
    const sql = db('drug_allergy')
      .select('drug_name')
      .where('cid', cid)
    if (limit) {
      sql.limit(limit)
    }
    return sql;
  }

  getHospitalVisit(db: Knex, cid, limit: number = 0) {
    const sql = db('hospital_visit')
      .select('history')
      .where('cid', cid)
    if (limit) {
      sql.limit(limit)
    }
    return sql;
  }



}
