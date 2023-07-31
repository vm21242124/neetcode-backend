import express from 'express'
import { createProblem, deleteAProblem, getAllProblems, getAproblemById, getOutput, submitCode } from '../Controllers/problem.controller.js'
const router =express.Router()
router.post('/create',createProblem);
router.get('/all',getAllProblems);
router.delete('/delete/:id',deleteAProblem)
router.get('/:id',getAproblemById)
router.post('/submit/:id',submitCode)
router.get('/getop/:token',getOutput)
export default router