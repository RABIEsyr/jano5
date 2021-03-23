
const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const db = require("../db/db");
const checkJwt = require("./../middleware/checkAuth");

router.get('', checkJwt, async(req, res, next) => {
    let userFrienList = await db.userSchema.findOne({_id: req.decoded.user._id})

    let chat1 = []
    for (let i = 0; i < userFrienList.friends.length; i++) {
        let chat = await db.chatSchema.find({
            $or: [

                {
                    $and: [
                        { to: mongoose.Types.ObjectId(req.decoded.user._id.toString()) },
                        { from: mongoose.Types.ObjectId(userFrienList.friends[i].toString()) }
                    ]
                }, {
                    $and: [
                        { to: mongoose.Types.ObjectId(userFrienList.friends[i].toString()) },
                        { from: mongoose.Types.ObjectId(req.decoded.user._id.toString()) }
                    ]
                }

            ]
        })
        .populate('from')
        chat1.push(chat[chat.length -1])

    }   
    res.send(chat1)
})

module.exports = router