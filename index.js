const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("unCaught Error", err);
  console.log("UNCAUGHT EXCEPTION!! 💥 Shutting Down...");
  process.exit(1);
});

dotenv.config({
  path: `./.env`,
});
const App = require(`./app`);

const DB = process.env.DATABASE_URI;

mongoose
  .connect(DB)
  .then(() => console.log("DB connection succesful"));

// console.log(process.env);
// console.log(App.get('env'));

// Start App
const port = process.env.PORT || 8000;
const server = App.listen(port, () => {
  console.log(`App running on port : ${port}`);
  console.log(App.get("env"));
});

process.on("unhandledRejection", (err) => {
  console.log("error is ", err.name, err.message);
  console.log("UNHANDLED REJECTION!! 💥 Shutting Down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋🏼 SIGTERM received. Shutting down the system.");
  server.close(() => {
    console.log("💥 process terminated");
  });
});
