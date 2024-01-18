const express = require('express');
const router  = express.Router(); 

const timerController = require('../controllers/timerController');
const jwtMiddlewares = require('../middlewares/jwtMiddleware');

router
    .route('/timer')
    .get(jwtMiddlewares.verifyToken ,timerController.listAllTimes)
    .post(jwtMiddlewares.verifyToken ,timerController.createATimer)


router
    .route('/timer/average')
    .get(jwtMiddlewares.verifyToken ,timerController.averageTime)

module.exports = router;