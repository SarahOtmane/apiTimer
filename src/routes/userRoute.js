module.exports = (server) =>{
    const userController = require('../controllers/userController');
    const jwtMiddleware = require('../middlewares/jwtMiddleware');

    server.post('/users/register', userController.userRegister);
    server.post('/users/login', userController.loginRegister);
    server.put('/users', jwtMiddleware.verifyToken, userController.userModify);
    server.delete('/users', jwtMiddleware.verifyToken, userController.deleteUser);
}