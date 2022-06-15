const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../db/db");
const checkJwt = require("../middleware/checkAuth");


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jan:jano1111@cluster0.5kxltgc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let count = 0;
let bookingList = [];

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

  let expiryDate =   new Date();
  let startDay2 = new Date(startDate)
  let result = expiryDate.setDate(startDay2.getDate() + +days);
  expiryDate = new Date(result)

  //const newBooking = new db.bookingSchema();

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

 newBooking.expirayDate = expiryDate;

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
      client.close();
      return;
    }

  console.log("Added a user");
  client.close();
  res.json({success: true})
});
});

});

router.get('/active-booking', checkJwt, async (req, res, next) => {
  let cDate = new Date();
  
  // const bookingList = await db.bookingSchema.find({expirayDate: {$gte: cDate}});
  // res.json(bookingList)
  
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    collection.find({expirayDate: {$gte: cDate}}).toArray(function(err, r) {
      if (err) {
        console.log("cannot add obj");
        res.json({success: false})
        return;
      }
  
    console.log("get active booking");
    client.close();
    console.log('rrrr', r)
    res.send(r)
  });
  });
  
  
});
  
router.get('/history', checkJwt,async (req, res, next) => {
  
  console.log('count', count)
  let cDate = new Date();
  
  if (count == 0) {
    // bookingList = await db.bookingSchema.find({expirayDate: {$lt: cDate}}).sort('-createdAt');
    client.connect(async err => {
      const collection = client.db("test").collection("devices");
    bookingList = await collection.find({expirayDate: {$lt: cDate}}).toArray() 
    console.log('dddddd', bookingList)
    res.send(bookingList.slice(0, 4))
    count +=4
    // client.close();
    })
  } else {
    if (count <= bookingList.length) {
      res.send(bookingList.slice(count, count + 1))
    } else {
      res.json(true)
    }
   count +=4
  }
});

router.get('/get-history-length', checkJwt, async (req, res, next) => {
    let cDate = new Date();
   
    // bookingList = await db.bookingSchema.find({expirayDate: {$lt: cDate}}).sort('-createdAt');
   
    client.connect(async err => {
      const collection = client.db("test").collection("devices");
    bookingList = await collection.find({expirayDate: {$lt: cDate}}).toArray() 
  
    // client.close();
    console.log('llllll', bookingList.length)
    res.json(bookingList.length)
    })
    // console.log('dddddd', bookingList.length)
    // res.json(bookingList.length)
});

router.get('/reset-count', checkJwt, (req, res, next) => {
  count = 0;
  bookingList = [];
  res.json('reset')
})

module.exports = router;
