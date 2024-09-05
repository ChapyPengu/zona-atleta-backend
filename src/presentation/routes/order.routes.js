const { Router } = require('express')
const OrderController = require('../../domain/controllers/order.controller')

const router = Router()

router.get('/', OrderController.getAll)
router.get('/:id', OrderController.getById)
router.put('/:id', OrderController.putById)
router.get('/:id/check', OrderController.getCheck)

module.exports = router