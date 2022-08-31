import { mongoose } from "../config/database";
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
  appointment_date: String,
  appointment_time: String,
  cause: String,
  contact_point: String,
  note: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalAppointment = mongoose.main.model("schemaPersonalAppointment", objSchema, 'personal_appointment');

export = PersonalAppointment;
