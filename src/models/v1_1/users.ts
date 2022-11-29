import { mongoose } from "../../config/database_users";
import { Document, Schema } from "mongoose";

// schema
var objSchema = new Schema({
    app_id: String,
    name: String,
    key: String,
    iv: String,
    is_actived: String
}, { versionKey: '_id' });

// model
// interface IUserModel extends  mongoose.Document { }
var Users = mongoose.user.model("schemaUsers", objSchema, 'users');

export = Users;
