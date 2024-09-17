const { Router } = require('express')
const ClientController = require('../../domain/controllers/client.controller')

const router = Router()

router.get('/', ClientController.getAll)
router.get('/:id', ClientController.getById)
router.delete('/:id', ClientController.deleteById)
router.put('/:id', ClientController.putById)
router.get('/:id/products', ClientController.getProducts)
router.post('/:id/products/:productId', ClientController.postProduct)
router.delete('/:id/products/:productId', ClientController.deleteProduct)
router.put('/:id/products/:productId', ClientController.putProduct)
router.get('/:id/orders', ClientController.getOrders)
router.post('/:id/orders', ClientController.postOrderByOneProduct)
router.post('/:id/orders-many', ClientController.postOrderByManyProducts)
router.post('/:id/like/:productId', ClientController.postLike)
router.delete('/:id/like/:productId', ClientController.deleteLike)
router.get('/:id/favorite', ClientController.getFavorites)
router.post('/:id/favorite/:productId', ClientController.postFavorite)
router.delete('/:id/favorite/:productId', ClientController.deleteFavorite)
router.get('/:id/notification', ClientController.getNotifications)
router.post('/:id/confirm', ClientController.postConfirm)
router.post('/send-email/discount', ClientController.sendEmailsOfDiscount)

module.exports = router