import { Router } from 'express'
import * as exercise_controller from '#controllers/exercise.controller.js'

const exercise_router = Router();

exercise_router.get('/', exercise_controller.getAllExercises)
exercise_router.post('/', exercise_controller.createExercise)

exercise_router.get('/:id', exercise_controller.getExercise)
exercise_router.post()