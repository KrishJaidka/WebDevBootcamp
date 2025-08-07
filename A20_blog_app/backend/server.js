require('dotenv').config({quiet:true});

const express = require("express");
const fileUpload = require('express-fileupload')
const connectDB = require("./database/connection")
const cloudinaryConnect = require("./database/cloudinary")
const userRoute = require("./routes/userRoutes")
const blogRoute = require("./routes/blogRoutes")
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp'
}))

connectDB();
cloudinaryConnect();

app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

app.listen((PORT),()=>{
    console.log(`Server up and running on port ${PORT}`);
})