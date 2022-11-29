import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  hospcode: String,
  hospname: String,
  lab_code: String,
  lab_detail: String,
  lab_order_name: String,
  reporter_name: String,
  pid: String,
pid_digit: String,
  visit_no: String,
  visit_date: String,
  visit_time: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalVisitLabInformation = mongoose.main.model("schemaPersonalVisitLabInformation", objSchema, 'personal_visit_lab_information');

export = PersonalVisitLabInformation;
