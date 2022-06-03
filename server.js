const app = require("express")();
const http = require("http").Server(app);


const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const db = require("./db/db");
const config = require("./config/config");


const bookingRoute = require("./routes/booking");
const indexRoute = require("./routes/index");
const checkAuth = require('./routes/checkAuth');


// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://jan:jano1111@ac-xg9w5fh-shard-00-00.5kxltgc.mongodb.net:27017,ac-xg9w5fh-shard-00-01.5kxltgc.mongodb.net:27017,ac-xg9w5fh-shard-00-02.5kxltgc.mongodb.net:27017/?ssl=true&replicaSet=atlas-e905gh-shard-0&authSource=admin&retryWrites=true&w=majority";
// MongoClient.connect(uri, function(err, client) {
//  if (!err) {
//    console.log('111111')
//  }
// });


mongoose.Promise = global.Promise;

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jan:jano1111@cluster0.5kxltgc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   collection.insertOne({name: 'ss'}, function(err, r) {
//     if (err) {
//       console.log("cannot add obj");
//       return;
//     }

//     console.log("Added a user");
//   client.close();
// });
// });
  



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

const path = require("path");
const expressSS = require("express");

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

module.exports.client = client