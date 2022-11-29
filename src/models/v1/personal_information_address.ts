import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var schema = new Schema({
  pid: String,
  pid_digit: String,
  house_no: String,
  village_no: String,
  alley: String,
  lane: String,
  road: String,
  sub_district: String,
  district: String,
  province: String,
  postal_code: String,
  full_address: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalInformationAddress = mongoose.main.model("schemaPersonalInformationAddress", schema, 'personal_information_address');

export = PersonalInformationAddress;
