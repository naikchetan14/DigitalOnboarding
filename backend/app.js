const express = require("express");
const cors = require('cors');
const cookieParser=require("cookie-parser");


const app = express();
app.use(cookieParser());
// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const corsOptions = {
  //   origin: ["http://localhost:3000"],
  origin: true,
  credentials: true,
};





app.use(cors(corsOptions));  


// if (process.env.NODE_ENV !== "production") {
//   dotenv.config({path:'backend/config/.env'});
// }

//Importing Routes
const hotelRoute =require("./routes/hotel.js");
const guestRoute =require('./routes/guestRoutes.js');
const guestAdmin =require('./routes/guestAdmin.js');
const userRoute=require('./routes/userRoutes.js');


app.use("/api/v1",hotelRoute);
app.use("/api/v1",guestRoute);
app.use("/api/v1",guestAdmin);
app.use("/api/v1",userRoute);

module.exports = app;
