import express from 'express'
import { createProblem, deleteAProblem, getAllProblems, getAproblemById } from '../Controllers/problem.controller.js'
const router =express.Router()


router.post('/create',createProblem);
router.get('/all',getAllProblems);
router.delete('/delete/:id',deleteAProblem)
router.get('/:id',getAproblemById)

export default router