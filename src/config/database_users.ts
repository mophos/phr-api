import * as mongoose from "mongoose";


  var mongoDB = `mongodb://${process.env.MONGO_USER_HOST}:${process.env.MONGO_USER_PORT}/${process.env.MONGO_USER_DBNAME}`;
  mongoose.user = mongoose.createConnection(mongoDB, {
    useNewUrlParser: true,
    bufferCommands: false,
    user: process.env.MONGO_USER_USER,
    pass: process.env.MONGO_USER_PASSWORD
  });

  // Get Mongoose to use the global promise library
  (mongoose.user as any).Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('[USER] MongoDB connected!');

  });

export { mongoose };