const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("Database Connected");
  });

  
  // mongoose
  //   .connect(MONGO_URI, {
  //     useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  //   })
  //   .then(() => {
  //     console.log("Successfully connected to database");
  //   })
  //   .catch((error) => {
  //     console.log("database connection failed. exiting now...");
  //     console.error(error);
  //     process.exit(1);
  //   });
};