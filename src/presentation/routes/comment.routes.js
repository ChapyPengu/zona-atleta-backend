const { Router } = require('express')
const CommentResponseController = require('../../domain/controllers/comment.controller')

const router = Router()

router.post('/response', CommentResponseController.postResponse)
router.put('/response/:id', CommentResponseController.putResponse)

router.put('/:id/comment', CommentResponseController.viewComment)//Para marcar un comentario como visto por los admin, utilizarlo cuando el comentario es respondido, haciendo que se reste el comentario de las notificaciones 
router.put('/:id/response', CommentResponseController.viewResponse)//Para marcar cuando el cliente ve la respuesta a su comentario, utilizarlo cuando el cliente elimina la notificacion, o cuando apreta sobre la notificacion y es redirigido al producto que tuvo el comentario

router.get('/get/comment', CommentResponseController.notViewComment)//Para cuando se loguea el admin, nos fijamos que comentarios no vio para mostrarlos en notificaciones y para calcular cuantas notificaciones tienen los vendedores
router.get('/:id/response', CommentResponseController.notViewResponse)//Para cuando se loguea el cliente, nos fijamos que respuestas no vio para mostrarlas en notificaciones y para caclular cuantas notificaciones tiene el cliente

module.exports = router