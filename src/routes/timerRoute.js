const express = require('express');
const router  = express.Router(); 

const timerController = require('../controllers/timerController');
const jwtMiddlewares = require('../middlewares/jwtMiddleware');

router
    .route('/times')
    // .get(timerController.)
     .post(jwtMiddlewares.verifyToken ,timerController.createATimer)


module.exports = router;