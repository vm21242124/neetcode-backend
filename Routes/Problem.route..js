import express from 'express'
import { createProblem, deleteAProblem, getAllProblems, getAproblemById, getOutput, submitCode } from '../Controllers/problem.controller.js'
import { IsLoggedIn } from '../Middleware/Auth.middleware.js';
const router =express.Router()
router.post('/create',IsLoggedIn, createProblem);
router.get('/all',getAllProblems);
router.delete('/delete/:id',IsLoggedIn,deleteAProblem)
router.get('/:id',getAproblemById)
router.post('/submit/:id',IsLoggedIn,submitCode)
router.get('/getop/:token',IsLoggedIn,getOutput)
export default router