import { mongoose } from "../../config/database";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
  cid_hash: String,
  health_id: String
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var PersonThaiCitizen = mongoose.main.model("schemaPersonThaiCitizen", objSchema, 'person_thai_citizen');

export = PersonThaiCitizen;
