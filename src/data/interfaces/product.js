const URL = process.env.BACKEND_URL
const BACKEND_URL = 'https://zona-atleta-backend-production.up.railway.app'

class Product {

  constructor(product) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.image = `${BACKEND_URL}${product.image}`
    this.details = `${URL}/api/product/${product.id}`
  }
}

module.exports = Product