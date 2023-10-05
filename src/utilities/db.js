const mongoose = require("mongoose");
require("dotenv").config();

if (process.env.AUTH_SOURCE !== undefined)
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: process.env.AUTH_SOURCE,
    user: process.env.USER_NAME,
    pass: process.env.PASSWORD,

  })
else
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
  });