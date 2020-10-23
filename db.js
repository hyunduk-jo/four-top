import mongoose from "mongoose";    //npm install mongoose
import dotenv from "dotenv";    //npm install dotenv
dotenv.config();

mongoose.connect(
  process.env.CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to db");
const handleError = error => console.log(`❌ Error on DB Connection: ${error}`)

db.once("open", handleOpen);
db.on("error", handleError);