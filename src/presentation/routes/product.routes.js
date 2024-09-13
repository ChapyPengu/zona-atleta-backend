const { Router } = require('express')
const ProductController = require('../../domain/controllers/product.controller')
const ValidatorToken = require('../../domain/middlewares/validator.token')

const router = Router()

router.get('/', ProductController.get)
router.post('/:id', ProductController.getById) // E pekado tio
router.get('/from/discount', ProductController.getDiscount)
router.get('/from/popular', ProductController.getPopular)
router.get('/from/last', ProductController.getLast)
router.post('/', ProductController.post)
router.delete('/:id', ProductController.deleteById)
router.put('/:id', ProductController.putById)
router.post('/:id/comment', ProductController.postComment)
router.post('/response', ProductController.postResponse)
router.put('/response/:id', ProductController.putResponse)
router.get('/category/:name', ProductController.getByCategory)
router.get('/name/:name', ProductController.getByName)

module.exports = router