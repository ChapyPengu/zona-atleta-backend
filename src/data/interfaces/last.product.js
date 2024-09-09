// const BACKEND_URL = process.env.BACKEND_URL
const BACKEND_URL = 'https://zona-atleta-backend-production.up.railway.app'

class LastProduct {

  constructor(last) {
    this.id = last.product.id
    this.name = last.product.name
    this.price = last.product.price
    this.image = `${BACKEND_URL}${last.product.image}`
  }
}

module.exports = LastProduct