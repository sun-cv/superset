import { Router }   from 'express';
import user_router  from '#routes/user.router.js'

const router = Router();


router.use('/users', user_router)
// router.use('/exercise', exercise_router)


export default router