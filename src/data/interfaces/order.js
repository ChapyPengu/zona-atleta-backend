const Product = require('./product')

class Order {

  constructor(order) {
    this.id = order.id
    this.date = order.date
    this.state = order.state
    this.address = order.address
    this.paymentId = order.paymentId
    this.paymentMethod = order.paymentMethod
    this.products = order.products.map(p => ({ ...(new Product(p.product)), amount: p.amount }))
  }
}

module.exports = Order