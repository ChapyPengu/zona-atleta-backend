const OrderModel = require('../../data/models/order.model')

class OrderController {

  static async getAll(req, res) {
    try {
      const orders = await OrderModel.findMany()
      return res.json(orders)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async getById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const order = await OrderModel.findById(id)
      return res.json(order)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }

  static async putById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { state, address } = req.body
      const order = await OrderModel.update(id, state, address)
      return res.json(order)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server Error' })
    }
  }
}

module.exports = OrderController