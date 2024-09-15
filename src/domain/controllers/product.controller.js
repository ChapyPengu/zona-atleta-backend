const ProductModel = require('../../data/models/product.model')
const CategoryModel = require('../../data/models/category.model')
const ClientModel = require('../../data/models/client.model')

const BACKEND_URL = process.env.BACKEND_URL

function formatQuery(query) {
  let offset = parseInt(query.offset)
  let limit = parseInt(query.limit)
  if (isNaN(offset) || offset < 0) {
    offset = 0
  }
  if (isNaN(limit) || limit < 0) {
    limit = 20
  }
  return {
    offset,
    limit
  }
}

function urls(entity, count, offset, limit) {
  let previous = null
  let next = null
  if (offset !== 0) {
    if ((offset - limit < 0) && (offset > 0)) {
      previous = `${BACKEND_URL}/api/${entity}?offset=${0}&limit=${offset}`
    } else if (offset - limit >= 0) {
      previous = `${BACKEND_URL}/api/${entity}?offset=${offset - limit}&limit=${limit}`
    }
  }
  if (offset + limit <= count) {
    next = `${BACKEND_URL}/api/${entity}?offset=${offset + limit}&limit=${limit}`
  }
  return {
    previous,
    next
  }
}

class ProductController {

  static async get(req, res) {
    try {
      const { offset, limit } = formatQuery(req.query)
      const count = await ProductModel.count()
      const { previous, next } = urls('product', count, offset, limit)
      const results = await ProductModel.findMany(offset, limit)
      return res.json({ count, previous, next, results })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getByCategory(req, res) {
    try {
      const name = req.params.name
      const products = await ProductModel.findManyByCategory(name)
      return res.json(products)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getByName(req, res) {
    try {
      const name = req.params.name
      const products = await ProductModel.findManyByName(name)
      return res.json(products)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { clientId } = req.body
      console.log(req.body)
      const product = await ProductModel.findById(id)
      if (!product)
        return res.status(404).json({ message: 'Product not found' })
      await ProductModel.update(id, { visits: product.visits + 1 })
      if (clientId) {
        const favorites = await ClientModel.findFavorites(clientId)
        for (const favorite of favorites) {
          console.log(product.id, favorite.id)
          if (product.id === favorite.id) {
            return res.json({...product, isFavorite: true})
          }
        }
        return res.json({...product, isFavorite: false})
      }
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getDiscount(req, res) {
    try {
      const results = await ProductModel.findManyDiscount(0, 6)
      return res.json({ results })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getPopular(req, res) {
    try {
      const results = await ProductModel.findManyPopular(0, 5)
      return res.json({ results })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getLast(req, res) {
    try {
      const results = await ProductModel.findManyLast(0, 7)
      return res.json({ results })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async post(req, res) {
    try {
      const p = req.body
      const category = await CategoryModel.findById(parseInt(p.categoryId))
      if (!category)
        return res.status(400).json({ message: 'Category not found' })
      let image = undefined
      if (req.file) {
        image = "/uploads/" + req.file.filename
      }
      const product = await ProductModel.create({
        name: p.name,
        categoryId: parseInt(p.categoryId),
        description: p.description === '' ? undefined : p.description,
        price: parseInt(p.price),
        stock: parseInt(p.stock),
        image: image,
        percentage: p.percentage === '' ? undefined : parseInt(p.percentage),
        gender: p.gender
      })
      console.log(product)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async deleteById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const product = await ProductModel.delete(id)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async putById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { price, stock, available, timesBought } = req.body
      const product = await ProductModel.update(id, { price, stock, available, timesBought })
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async postComment(req, res) {
    try {
      const productId = parseInt(req.params.id)
      const {message, clientId} = req.body
      const comment = await ProductModel.createComment(productId, {clientId, message})
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
  static async viewComment(req,res){
    try{
      const id = parseInt(req.params.id)
      const comment = await ProductModel.putViewComment(id)
      return res.json(comment)
    }catch (e) {
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

  //PUTVIEWRESPONSE()
  //Pone visto ✔✔ a la respuesta de los vendedores
  //Pasarle id de la respuesta
  static async viewResponse(req,res){
    try{
      const id = parseInt(req.params.id)
      const response = await ProductModel.putViewResponse(id)
      return res.json(response)
    }catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  //GETNOTVIEWRESPONSE()
  //Devuelve todas las repuestas no vistas de los vendedores hacia el cliente
  //Pasarle id del cliente
  static async notViewResponse(req,res){
    try{
      const id = parseInt(req.params.id)
      const response = await ProductModel.getNotViewResponse(id)
      return res.json(response)
    }catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  //GETNOTVIEWCOMMENT()
  //Devuelve todos los comentarios no vistos de los clientes hacia los vendedores
  static async notViewComment(req,res){
    try{
      const comment = await ProductModel.getNotViewComment()
      return res.json(comment)
    }catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }
}

module.exports = ProductController