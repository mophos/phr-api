import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var schemaDrugstore = new Schema({
  "LOCATION_INFO": {
    "ENTREPRENEUR_IDENTIFY": String,
    "ENTREPRENEUR_NAME": String,
    "LOCATION_LICENSE": String,
    "LOCATION_NAME": String,
    "LOCATION_FULL_ADDR": String,
    "ADDR_NO": String,
    "PROVINCE": String,
    "DISTRICT": String,
    "SubDISTRICT": String,
    "ZIPCODE": String,
    "LATITUDE": String,
    "LONGTITUDE": String,
    "PROCESS_ID": String,
    "TEL": String,
    "EMAIL": String,
    "HCODE": String,
    "LOCATION_JOB_TIME": String,
    "DATA_LINKGATE": {
      "alleyCode": String,
      "alleyDesc": String,
      "alleyWayCode": String,
      "alleyWayDesc": String,
      "districtCode": String,
      "districtDesc": String,
      "houseID": String,
      "houseNo": String,
      "provinceCode": String,
      "provinceDesc": String,
      "roadCode": String,
      "roadDesc": String,
      "subdistrictCode": String,
      "subdistrictDesc": String,
      "villageNo": String,
    },
  },
  "LOCATION_BSN": [
    {
      "CTZNO_OPERATOR": String,
      "OPERATOR_NAME": String
    }
  ],
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var Drugstore = mongoose.main.model("schemaDrugstore", schemaDrugstore, 'drug_store');

export = Drugstore;
