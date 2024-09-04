const { Router } = require('express')
const ProductController = require('../../domain/controllers/product.controller')
const ValidatorToken = require('../../domain/middlewares/validator.token')

const router = Router()

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getById)
router.post('/', ProductController.post)
router.delete('/:id', ProductController.deleteById)
router.put('/:id', ProductController.putById)
router.post('/:id/comment', ProductController.postComment)
router.post('/response', ProductController.postResponse)
router.put('/response', ProductController.putResponse)

module.exports = router