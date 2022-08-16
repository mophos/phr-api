import { mongoose } from "../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  pid_api: String,
  pid: String
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalPid = mongoose.model("schemaPersonalPid", objSchema, 'personal_pid');

export = PersonalPid;
