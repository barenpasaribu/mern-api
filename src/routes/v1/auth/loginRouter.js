import express from 'express'
import { login } from 'controllers/auth/usersController'

const router = express.Router()

router.post('/v1/login', login)

export default router