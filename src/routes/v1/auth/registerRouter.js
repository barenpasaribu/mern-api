import express from 'express'
import { register } from 'controllers/auth/usersController'

const router = express.Router()

router.post('/v1/register', register)

export default router