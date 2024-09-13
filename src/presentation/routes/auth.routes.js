const { Router } = require('express')
const AuthController = require('../../domain/controllers/auth.controller')

const router = Router()

router.post('/login', AuthController.login)
router.post('/login-sales-manager', AuthController.loginSalesManager)
router.post('/google-login', AuthController.googleLogin)
router.post('/register', AuthController.register)
router.post('/register-sales-manager', AuthController.registerSalesManager)
router.post('/logout', AuthController.logout)
router.post('/verify', AuthController.verify)

module.exports = router