const { Router } = require('express')
const OrderMessageController = require('../../domain/controllers/order.message.controller')
const router = Router()
router.get('/:id', OrderMessageController.getAll)
router.post('/:id', OrderMessageController.post)
router.get('/:id/order-message', OrderMessageController.getNotViewClients)
router.put('/:id', OrderMessageController.putView)
router.get('/', OrderMessageController.getNotViewSales)
module.exports = router
