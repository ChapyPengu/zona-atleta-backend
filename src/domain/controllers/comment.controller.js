const CommentModel = require('./')
const BACKEND_URL = process.env.BACKEND_URL

class ProductController {

  static async getAllByProductId(req, res) {
    try {
      const { productId } = req.query
      if (!productId)
        return res.status(403).json({ message: 'Product id not found' })

      const comments = await 
      return res.json()
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
      const comment = await ProductModel.createComment(clientId, productId,message)
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
      const response = await ProductModel.createResponse(commentId, message)
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
      const product = await ProductModel.updateResponse(responseId, message)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }
}

module.exports = ProductController