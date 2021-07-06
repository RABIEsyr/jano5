const express = require('express');
const router = express.Router();

const checkJwt = require("./../middleware/checkAuth");


router.post('/', checkJwt, (req, res, next) => {
    if (req.decoded.user._id == req.body.id)
        res.send('true')
})
module.exports = router;