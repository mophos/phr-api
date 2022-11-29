import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var userSchema = new Schema({
  pid: String,
  pid_digit: String,
  birthday: String,
  blood_group: String,
  prename: String,
  first_name: String,
  middle_name: String,
  last_name: String,
  home_phone: String,
  phone_number: String,
  nationality: String,
  source: String,
  created_date: { type: Date, default: Date.now }
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonalInformation = mongoose.main.model("schemaPersonalInformation", userSchema, 'personal_information');

export = PersonalInformation;
