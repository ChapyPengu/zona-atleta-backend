// const BACKEND_URL = process.env.BACKEND_URL
const BACKEND_URL = 'https://zona-atleta-backend-production.up.railway.app'

class ProductDetails {

  constructor(product) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.image = `${BACKEND_URL}${product.image}`
    this.percentage = product.percentage
    this.description = product.description
    this.comments = product.comments
    this.likes = !product.likes ? 0 : product.likes.length
    this.available = product.available
    this.visits = product.visits
    this.favorites = !product.favorites ? 0 : product.favorites.length
    this.stock = product.stock
    this.timesBought = product.timesBought
  }
}

module.exports = ProductDetails