const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//handling uncaugh exception

process.on('uncaughtException',(err)=>{
    console.log(`error:${err.message}`);
    console.log(`shutting down`);
    process.exit(1)
})
//config
dotenv.config({ path: "backend/config/config.env" });

//database connection
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`working on ${process.env.PORT}`);
});
 
//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log(`shutting down`);
  server.close(() => {
    process.exit(1);
  });
});
