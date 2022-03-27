const mongoose = require("mongoose");

const connect = async () => {
  mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);
  const connection = mongoose.connection;

  connection.on("open", () => {
    console.log("Connection successful!");
  });
};

module.exports = connect;