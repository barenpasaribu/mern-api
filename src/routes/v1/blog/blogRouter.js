import express from 'express'
import { body } from 'express-validator'
import {
    createPost, getAllPosts,
    getDataById, updateDataById, deleteData
} from 'controllers/blog/blogController'

const router = express.Router()

const urlAPI = '/v1/blog'
const apiRoute = `${urlAPI}/post`
const apiRouter = {
    api: apiRoute,
    getById: `${apiRoute}/:id`
}

router.post(apiRouter.api,
    body('title').isLength({ min: 5 }).withMessage('invalid value, min 5 character'),
    body('body').isLength({ min: 5 }).withMessage('invalid value, min 5 character'),
    createPost)

router.get(apiRouter.api, getAllPosts)
router.get(apiRouter.getById, getDataById)
router.put(apiRouter.getById,
    body('title').isLength({ min: 5 }).withMessage('invalid value, min 5 character'),
    body('body').isLength({ min: 5 }).withMessage('invalid value,min 5 character'), updateDataById)
router.delete(apiRouter.getById, deleteData)

export default router