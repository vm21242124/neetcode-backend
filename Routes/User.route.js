import express from 'express'
import { signUp, signin, signout } from '../Controllers/user.controller.js';
import { IsLoggedIn } from '../Middleware/Auth.middleware.js';

const router=express.Router()
router.post('/register',signUp)
router.post('/signin',IsLoggedIn,signin)
router.get('/signout',signout)

export default router;