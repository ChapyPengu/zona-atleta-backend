// const BACKEND_URL = process.env.BACKEND_URL
const BACKEND_URL = 'https://zona-atleta-backend-production.up.railway.app'

class DiscountedProduct {

  constructor(discount) {
    this.id = discount.product.id
    this.name = discount.product.name
    this.price = discount.product.price
    this.image = `${BACKEND_URL}/${discount.product.image}`
    this.percentage = discount.percentage
  }
}

module.exports = DiscountedProduct