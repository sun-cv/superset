import { Router }           from 'express';
import * as user_controller from '#controllers/user.controller.js'
import * as validate        from '#middleware/validate.js'


const user_router = Router()


user_router.get('/', user_controller.getAllUsers)
user_router.post('/', validate.userData, user_controller.createUser)

user_router.get('/:id', user_controller.getUser)
user_router.patch('/:id', user_controller.updateUser)
user_router.delete('/:id', user_controller.deleteUser)


export default user_router