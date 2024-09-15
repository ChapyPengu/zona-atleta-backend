const { Router } = require('express')
const OrderMessageController = require('../../domain/controllers/order.message.controller')
const router = Router()
router.get('/', OrderMessageController.getAll)
router.get('/:id', OrderMessageController.getNotView)
router.post('/', OrderMessageController.post)
router.put('/:id', OrderMessageController.put)
module.exports = router
