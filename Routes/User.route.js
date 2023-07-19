import express from 'express'
import { signUp, signin, signout } from '../Controllers/user.controller.js';

const router=express.Router()
router.post('/register',signUp)
router.post('/signin',signin)
router.get('/signout',signout)

export default router;