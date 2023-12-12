module.exports = (server) =>{
    const userController = require('../controllers/userController');

    server.post('/users/register', userController.userRegister);
    server.post('/users/login', userController.loginRegister);
}