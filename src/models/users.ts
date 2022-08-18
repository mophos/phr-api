import { mongoose } from "../config/database_users";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
    app_id: String,
    name: String,
    key: String,
    iv: String
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }

var Users = mongoose.model("schemaUsers", objSchema, 'users');

export = Users;
