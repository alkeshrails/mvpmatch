import express from 'express'
import AuthController from './../controllers/AuthController'

const router = express.Router()

const baseUrl = '/auth'

router.post(baseUrl + '/login', AuthController.userLogin)
router.post(baseUrl + '/register', AuthController.userRegistration)

export default router
