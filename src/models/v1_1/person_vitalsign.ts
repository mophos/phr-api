import { mongoose } from "../../config/database";
import { Schema } from "mongoose";

// schema
var objPersonVitalSign = new Schema({
  "health_id": String,
  "type": String,
  "datetime": Date,
  "updated_date": Date,
  "sys": String,
  "dia": String,
  "hearth_rate": String,
  "pulse_rate": String,
  "respiratory_rate": String,
  "temperature": String,
  "source": String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonVitalSign = mongoose.model("schemaPersonVitalSign", objPersonVitalSign, 'person_vitalsign');

export = PersonVitalSign;
