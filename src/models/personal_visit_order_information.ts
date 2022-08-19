import { mongoose } from "../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  visit_date: String,
  visit_time: String,
  hospcode: String,
  hospname: String,
  pid: String,
pid_digit: String,
  visit_no: String,
  source: String,
  med_code: String,
  med_name: String,
  verify_date: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalVisitOrderInformation = mongoose.main.model("schemaPersonalVisitOrderInformation", objSchema, 'personal_visit_order_information');

export = PersonalVisitOrderInformation;
