const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../db/db");
const checkJwt = require("../middleware/checkAuth");


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jan:jano1111@cluster0.5kxltgc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const {client} = require('../server');


router.post("/add-booking", checkJwt, async (req, res, next) => {
  console.log(req.body)
 const name = req.body.name
 const location = req.body.location
 const floor = req.body.floor
 const departement = req.body.departement
 const price =  req.body.price
 const ownerName = req.body.ownerName
 const ownerMobile =  req.body.ownerMobile
 const tenantName =  req.body.tenantName
 const tenantMobile =  req.body.tenantMobile
 const startDate =  req.body.startDate
 const days =  req.body.days

 
  let notes = '';
  if (req.body.notes)
  notes = req.body.notes

//  const newBooking = new db.bookingSchema();
const newBooking = {};

 newBooking.place = name;
 newBooking.location = location;
 newBooking.department = departement;
 newBooking.floor = floor;
 newBooking.price = +price;

 newBooking.ownerName = ownerName;
 newBooking.ownerMobile = ownerMobile;
 newBooking.tenantName = tenantName;
 newBooking.tenantMobile = tenantMobile;

 newBooking.start = startDate;
 newBooking.days = +days;

 newBooking.notes = notes;

//  newBooking.save((err, b) => {
//    if (err) {
//     console.log('aaaaaaaa')
//     res.json({success: false})
//     throw err;
//    } else {
//      console.log('sssssssssss')
//     res.json({success: true})
//    }
//  })


 
 client.connect(err => {
  const collection = client.db("test").collection("devices");
  collection.insertOne(newBooking, function(err, r) {
    if (err) {
      console.log("cannot add obj");
      res.json({success: false})
      return;
    }

  console.log("Added a user");
  client.close();
  res.json({success: true})
});
});

});

router.get('/active-booking', checkJwt, async (req, res, next) => {
  // const bookingList = await db.bookingSchema.find({});
  // res.json(bookingList)
  
  const { MongoClient } = require('mongodb');
 const uri = "mongodb+srv://jan:jano1111@cluster0.5kxltgc.mongodb.net/?retryWrites=true&w=majority";
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect( async err => {
    const collection = client.db("test").collection("devices");
   const a = await collection.find({}).toArray();
  
    console.log(a);
    client.close();
    res.json(a)
  
  });
  });
  

module.exports = router;
