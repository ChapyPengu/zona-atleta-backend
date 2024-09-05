const ClientModel = require('../../data/models/client.model')
const OrderModel = require('../../data/models/order.model')
const ProductModel = require('../../data/models/product.model')
const SocketManager = require('../../data/clients/socket.manager')

class ClientController {

  static async getAll(req, res) {
    try {
      const clients = await ClientModel.findMany()
      return res.json(clients)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async getById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const client = await ClientModel.findById(id)
      return res.json(client)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async deleteById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const client = await ClientModel.delete(id)
      return res.json(client)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async putById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { username, password } = req.body
      const client = await ClientModel.update(id, username, password)
      return res.json(client)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async getProducts(req, res) {
    try {
      const id = parseInt(req.params.id)
      const products = await ClientModel.findProducts(id)
      return res.json(products)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async postProduct(req, res) {
    try {
      const id = parseInt(req.params.id)
      const productId = parseInt(req.params.productId)
      const { amount } = req.body
      const product = await ClientModel.createProduct(id, productId, amount)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async deleteProduct(req, res) {
    try {
      const id = parseInt(req.params.id)
      const productId = parseInt(req.params.productId)
      const product = await ClientModel.deleteProduct(id, productId)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async putProduct(req, res) {
    try {
      const id = parseInt(req.params.id)
      const productId = parseInt(req.params.productId)
      const { amount } = req.body
      const product = await ClientModel.updateProduct(id, productId, amount)
      return res.json(product)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async getOrders(req, res) {
    try {
      const id = parseInt(req.params.id)
      const orders = await ClientModel.findOrders(id)
      return res.json(orders)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async postOrderByOneProduct(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { paymentMethod, address, productId, amount } = req.body
      const productFound = await ProductModel.findById(productId)
      if (!productFound)
        return res.status(400).json({ message: 'Product not found' })
      if (productFound.stock - amount < 0)
        return res.status(400).json({ message: 'Insufficient stock' })
      const productFormat = { productId, amount }
      // Inicia el codigo de Rodri
      const paymentId = "984137"
      // Termina el codigo de Rodri
      const order = await ClientModel.createOrder(id, paymentMethod, paymentId, address, productFormat)
      const updatedProduct = await ProductModel.update(
        productFound.id,
        undefined,
        productFound.stock - amount,
        undefined,
        productFound.timesBought + 1
      )
      return res.json(order)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async postOrderByManyProducts(req, res) {
    try {
      const id = parseInt(req.params.id) // Se obtiene la id del cliente
      const { paymentMethod, address } = req.body
      const products = await ClientModel.findProducts(id)
      if (products.length === 0) // Si el cliente no tiene productos no puede comprar
        return res.status(400).json({ message: 'Shopping Cart is Empty' })
      for (const cp of products) {
        if (cp.product.stock - cp.amount < 0) {
          return res.status(400).json({ message: `Insufficient stock of ${cp.product.name}` })
        }
      }
      const productsFormat = products.map(p => ({ productId: p.productId, amount: p.amount })) // Formatea la lista de productos para que el modelo la entienda
      // Inicia el codigo de Rodri
      const paymentId = "984137"
      // Termina el codigo de Rodri
      const order = await ClientModel.createOrder(id, paymentMethod, paymentId, address, productsFormat)
      for (const cp of products) {
        // Actualiza los datos de todos los productos de la compra
        const updatedProduct = await ProductModel.update(
          cp.productId,
          undefined,
          cp.product.stock - cp.amount,
          undefined,
          cp.product.timesBought + 1
        )
      }
      const shoppingCart = await ClientModel.deleteManyProduct(id) // Elimina los productos que estaban en el carrito de compras
      return res.json(order)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async postLike(req, res) {
    try {
      const id = parseInt(req.params.id)
      const productId = parseInt(req.params.productId)
      const like = await ClientModel.createLike(id, productId)
      return res.json(like)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async deleteLike(req, res) {
    try {
      const id = parseInt(req.params.id)
      const productId = parseInt(req.params.productId)
      const like = await ClientModel.deleteLike(id, productId)
      return res.json(like)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async getFavorites(req, res) {
    try {
      const id = parseInt(req.params.id)
      const favorites = await ClientModel.findFavorites(id)
      return res.json(favorites)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async postFavorite(req, res) {
    try {
      const id = parseInt(req.params.id)
      const productId = parseInt(req.params.productId)
      const favorite = await ClientModel.createFavorite(id, productId)
      return res.json(favorite)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async deleteFavorite(req, res) {
    try {
      const id = parseInt(req.params.id)
      const productId = parseInt(req.params.productId)
      const favorite = await ClientModel.deleteFavorite(id, productId)
      return res.json(favorite)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async getNotifications(req, res) {
    try {
      const id = parseInt(req.params.id)
      const notifications = await ClientModel.findNotifications(id)
      return res.json(notifications)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = ClientController