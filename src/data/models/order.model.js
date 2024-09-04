const database = require('../database/database')

class OrderModel {

  static async findMany() {
    const orders = await database.order.findMany()
    return orders
  }

  static async findById(id) {
    const order = await database.order.findFirst({
      where: {
        id
      }
    })
    return order
  }

  static async update(id, state, address) {
    const order = await database.order.update({
      where: {
        id
      },
      data: {
        state,
        address
      }
    })
    return order
  }
}

module.exports = OrderModel