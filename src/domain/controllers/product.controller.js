const ProductModel = require('../../data/models/product.model')
const CategoryModel = require('../../data/models/category.model')

class ProductController {

  // static async getAllByFilters(req, res) {
  //   try {
  //     const search = {}
  //     const { name, category, min, max } = req.query
  //     if (name) {
  //       search.name = name
  //     }
  //     if (category) {
  //       search.category = category
  //     }

  //     if (category) {
  //       search.max = max
  //     }

  //     if (category) {
  //       search.min = min
  //     }

  //     const products = await ProductModel.findByFilters(search)
  //     if (products.length === 0)
  //       return res.status(400).json({ message: 'No hay productos' })
  //     return res.json(products)
  //   } catch (e) {
  //     console.log(e)
  //     return res.status(500).json({ message: 'Server Error' })
  //   }
  // }

  static async getAll(req, res) {
    try {
      const products = await ProductModel.findMany()
      if (products.length === 0)
        return res.status(400).json({ message: 'No hay productos' })
      return res.json(products)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const product = await ProductModel.findById(id)
      if (!product)
        return res.json({ message: 'Product not found' })
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getDiscount(req, res) {
    try {
      const products = await ProductModel.findManyDiscount()
      if (products.length === 0)
        return res.status(400).json({ message: 'No hay productos' })
      return res.json(products)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getPopular(req, res) {
    try {
      const products = await ProductModel.findManyPopular()
      if (products.length === 0)
        return res.status(400).json({ message: 'No hay productos' })
      return res.json(products)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getLast(req, res) {
    try {
      const products = await ProductModel.findManyLast()
      if (products.length === 0)
        return res.status(400).json({ message: 'No hay productos' })
      return res.json(products)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async post(req, res) {
    try {
      const p = req.body
      console.log(p)
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
        description: p.description,
        price: parseInt(p.price),
        stock: parseInt(p.stock),
        image: image
      })
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
      const product = await ProductModel.update(id, price, stock, available, timesBought)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async postComment(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { message } = req.body
      const comment = await ProductModel.createComment(id, message)
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