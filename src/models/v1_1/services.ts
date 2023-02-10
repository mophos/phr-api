import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  visit_date: Date,
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

var Services = mongoose.main.model("schemaService", objSchema, 'services');

export = Services;
