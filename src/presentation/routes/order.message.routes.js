const { Router } = require('express')
const OrderMessageController = require('../../domain/controllers/order.message.controller')
const router = Router()
router.get('/', OrderMessageController.getAll)
router.post('/', OrderMessageController.post)
router.get('/:id', OrderMessageController.getNotView)
router.put('/', OrderMessageController.putView)
module.exports = router
