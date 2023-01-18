import express from 'express'
import AuthController from './../controllers/AuthController'
import ProductController from '../controllers/ProductController'
import Helper from '../utils/helpers'


const router = express.Router()

const baseUrl = '/auth'

router.post(baseUrl + '/login',  AuthController.userLogin )
router.post(baseUrl + '/register', AuthController.userRegistration)
router.get(baseUrl + '/getMe', AuthController.getMe)
router.post(baseUrl + '/product', [Helper.verifyToken], ProductController.addProduct)
router.get(baseUrl + '/product', [Helper.verifyToken], ProductController.getProducts)
router.put(baseUrl + '/product', [Helper.verifyToken], ProductController.updateProduct)
router.delete(baseUrl + '/product', [Helper.verifyToken], ProductController.deleteProduct)
router.post(baseUrl + '/purchase-product', [Helper.verifyToken], ProductController.purchaseProduct)
router.get(baseUrl + '/product-by-id', [Helper.verifyToken], ProductController.getProductsById)

export default router
