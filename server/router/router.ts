import express from 'express'
import AuthController from '../Controller/auth-controller'
import authenticate from '../Middleware/authenticate';
import userController from '../Controller/user-controller';
const router = express.Router();


router.post('/send-otp', AuthController.sendOtp)
router.post('/verify-otp', AuthController.verify)

router.get('/connections', authenticate, userController.connections)
router.get('/users', userController.getUsers)
router.get('/user', userController.getUser)
router.get('/messages', userController.getMessages)

export default router