const express = require("express"),
  dotenv = require("dotenv"),
  establishConnection = require("./config/connection");

const app = express();

// Get Configurations
if (process.env.NODE_ENV != "production")
  dotenv.config({ path: "./config/config.env" });

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

const port = process.env.PORT || 3000;
const serve = async () => {
  app.listen(port, async () => {
    console.log("Server started listening on port 3000.");

    // Establish MongoDB Connection
    await establishConnection();
  });
};

serve().catch((e) => {
  console.error(e);
});
