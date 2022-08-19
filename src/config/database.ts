import * as mongoose from "mongoose";

if (process.env.NODE_ENV === "DEV") {

  var mongoDB = `mongodb://${process.env.MONGO_DEV_HOST}:${process.env.MONGO_DEV_PORT}/${process.env.MONGO_DEV_DBNAME}`;
  mongoose.main = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    bufferCommands: false,
    user: process.env.MONGO_DEV_USER,
    pass: process.env.MONGO_DEV_PASSWORD
  });

  // Get Mongoose to use the global promise library
  (mongoose as any).Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('[DEV] MongoDB connected!');

  });

} else {
  var mongoDB = `mongodb://${process.env.MONGO_PROD_HOST}:${process.env.MONGO_PROD_PORT}/${process.env.MONGO_PROD_DBNAME}`;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    bufferCommands: false,
    user: process.env.MONGO_PROD_USER,
    pass: process.env.MONGO_PROD_PASSWORD
  });
  // Get Mongoose to use the global promise library
  (mongoose as any).Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('[PRODUCTION] MongoDB connected!');
  });

}

export { mongoose };