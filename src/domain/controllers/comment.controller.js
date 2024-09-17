const CommentResponseModel = require('../../data/models/comment.model')
/* const CommentResponseModel = require('./') */
const BACKEND_URL = process.env.BACKEND_URL

class CommentResponseController {

  static async postComment(req, res) {
    try {
      const clientId = req.body.clientId
      const message = req.body.message
      const productId = parseInt(req.params.id)
      const comment = await CommentResponseModel.createComment({ clientId, productId, message })
      console.log(comment)
      return res.json(comment)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  //PUTVIEWCOMMENT()
  //pone visto ✔✔ al comentario del cliente 
  //Pasarle el id del comentario
  static async viewComment(req, res) {
    try {
      const id = parseInt(req.params.id)
      const comment = await CommentResponseModel.putViewComment(id)
      return res.json(comment)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async postResponse(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { commentId, message } = req.body
      const response = await CommentResponseModel.createResponse({commentId, message})
      return res.json(response)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async putResponse(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { responseId, message } = req.body
      const product = await CommentResponseModel.updateResponse(responseId, message)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  //PUTVIEWRESPONSE()
  //Pone visto ✔✔ a la respuesta de los vendedores
  //Pasarle id de la respuesta
  static async viewResponse(req, res) {
    try {
      const id = parseInt(req.params.id)
      const response = await CommentResponseModel.putViewResponse(id)
      return res.json(response)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  //GETNOTVIEWRESPONSE()
  //Devuelve todas las repuestas no vistas de los vendedores hacia el cliente
  //Pasarle id del cliente
  static async notViewResponse(req, res) {
    try {
      const id = parseInt(req.params.id)
      const response = await CommentResponseModel.getNotViewResponse(id)
      return res.json(response)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  //GETNOTVIEWCOMMENT()
  //Devuelve todos los comentarios no vistos de los clientes hacia los vendedores
  static async notViewComment(req, res) {
    try {
      const comment = await CommentResponseModel.getNotViewComment()
      return res.json(comment)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }
/*   static async getAllByProductId(req, res) {
    try {
      const { productId } = req.query
      if (!productId)
        return res.status(403).json({ message: 'Product id not found' })

      const comments = await CommentResponseModel.getProductIdComments({productId})
      return res.json(comments)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async postComment(req, res) {
    try {
      const clientId = req.body.clientId
      const message = req.body.message
      const productId = parseInt(req.params.id)
      const comment = await CommentResponseModel.createComment(clientId, productId,message)
      console.log(comment)
      return res.json(comment)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async postResponse(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { commentId, message } = req.body
      const response = await CommentResponseModel.createResponse(commentId, message)
      return res.json(response)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async putResponse(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { responseId, message } = req.body
      const product = await CommentResponseModel.updateResponse(responseId, message)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  } */
}

module.exports = CommentResponseController