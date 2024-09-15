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
router.put('/:id/comment', ProductController.viewComment)//Para marcar un comentario como visto por los admin, utilizarlo cuando el comentario es respondido, haciendo que se reste el comentario de las notificaciones 
router.put('/:id/response', ProductController.viewResponse)//Para marcar cuando el cliente ve la respuesta a su comentario, utilizarlo cuando el cliente elimina la notificacion, o cuando apreta sobre la notificacion y es redirigido al producto que tuvo el comentario
router.get('/comment', ProductController.notViewComment)//Para cuando se loguea el admin, nos fijamos que comentarios no vio para mostrarlos en notificaciones y para calcular cuantas notificaciones tienen los vendedores
router.get('/:id/response', ProductController.notViewResponse)//Para cuando se loguea el cliente, nos fijamos que respuestas no vio para mostrarlas en notificaciones y para caclular cuantas notificaciones tiene el cliente

module.exports = router