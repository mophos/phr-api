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
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalVisit = mongoose.main.model("schemaPersonalVisit", objSchema, 'personal_visit');

export = PersonalVisit;
