import { mongoose } from "../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  visit_date: String,
  visit_time: String,
  hospcode: String,
  hospname: String,
  pid: String,
  visit_no: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalVisitOrder = mongoose.model("schemaPersonalVisitOrder", objSchema, 'personal_visit_order');

export = PersonalVisitOrder;
