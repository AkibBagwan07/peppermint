const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const userRoutes=require('./routes/userroutes')


dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/',userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
