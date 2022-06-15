const app = require("express")();
const http = require("http").Server(app);


const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const db = require("./db/db");
const config = require("./config/config");

const path = require("path");
const expressSS = require("express");

const bookingRoute = require("./routes/booking");
const indexRoute = require("./routes/index");
const checkAuth = require('./routes/checkAuth');




mongoose.Promise = global.Promise;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jan:jano1111@cluster0.5kxltgc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.Promise = global.Promise;
// const ConnectionUri = config.db;
// mongoose.connect(ConnectionUri, (err) => {
//   if (err) {
//     console.log("Error in connecting to Mongo DB !!");
//     throw err;
//   }
//   console.log("successfully connected to database ..");
// });



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());


app.use("/index", indexRoute);
app.use("/booking", bookingRoute);
app.use('/check-auth', checkAuth);



app.use(expressSS.static(__dirname + '/dist'));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
});




const port = process.env.PORT || config.port || 8000;
http.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server running on port ${port}`);
  }
});

