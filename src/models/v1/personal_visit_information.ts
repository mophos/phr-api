import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  visit_date: String,
  visit_time: String,
  hospcode: String,
  hospname: String,
  visit_no: String,
  pid: String,
pid_digit: String,
  bmi: String,
  bp: String,
  bt: String,
  bw: String,
  cc: String,
  ht: String,
  pe: String,
  pi: String,
  pr: String,
  rr: String,
  sat_o2: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalVisitInformation = mongoose.main.model("schemaPersonalVisitInformation", objSchema, 'personal_visit_information');

export = PersonalVisitInformation;
