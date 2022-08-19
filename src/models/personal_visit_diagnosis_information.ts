import { mongoose } from "../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  visit_date: String,
  visit_time: String,
  visit_no: String,
  hospcode: String,
  hospname: String,
  pid: String,
pid_digit: String,
  source: String,
  diagnosis_code: String,
  diagnosis_result: String,
  diagnosis_date: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalVisitLabDiagnosisInformation = mongoose.main.model("schemaPersonalVisitLabDiagnosisInformation", objSchema, 'personal_visit_diagnosis_information');

export = PersonalVisitLabDiagnosisInformation;
