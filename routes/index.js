const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../config/config');


router.post('/auth', (req, res) => {
    console.log('xxxxxxx', req.body)
    let isJan = req.body.password
    if (isJan == 'jano1111') {
    var token = jwt.sign(
        { user: isJan },
        config.secret
    );

    res.json({
        token
    })
}
});



               
module.exports = router;