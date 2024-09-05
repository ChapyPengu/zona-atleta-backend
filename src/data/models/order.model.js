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
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        },
        client: true
      }
    })
    return {
      ...order,
      products: order.products.map(p => ({ ...p.product, amount: p.amount }))
    }
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