const database = require('../database/database')

const productInclude = {
  category: true
}

class ProductModel {

  static async findMany() {
    const products = await database.product.findMany({
      include: productInclude
    })
    return products
  }

  static async findByFilters(search = {}, offset = 0, limit = 15) {
    const products = await database.product.findMany({})
    return products
  }

  static async findById(id) {
    const product = await database.product.findFirst({
      where: {
        id
      },
      include: {
        category: true,
        comments: {
          include: {
            response: true
          }
        }
      }
    })
    return product
  }

  static async findManyDiscount() {
    const discounts = await database.discount.findMany({
      include: {
        product: productInclude
      }
    })
    return discounts.map(p => ({...p.product, percentage: p.percentage}))
  }

  static async findManyPopular() {
    const products = await database.product.findMany({
      skip: 10,
      orderBy: {
        visits: true
      },
      include: productInclude
    })
    return products
  }

  static async findManyLast() {
    const last = await database.last.findMany({
      skip: 10,
      include: {
        product: productInclude
      }
    })
    return last.map(p => ({...p.product}))
  }

  static async create({ name, categoryId, price, stock, description, image }) {
    const product = await database.product.create({
      data: {
        name,
        categoryId,
        price,
        stock,
        description,
        image
      },
      include: productInclude
    })
    return product
  }

  static async update(id, price, stock, available, timesBought) {
    const product = await database.product.update({
      where: {
        id
      },
      data: {
        price,
        stock,
        available,
        timesBought
      },
      include: productInclude
    })
    return product
  }

  static async delete(id) {
    const product = await database.product.delete({
      where: {
        id
      },
      include: productInclude
    })
    return product
  }

  static async createComment(productId, message) {
    const comment = await database.comment.create({
      data: {
        productId,
        message
      }
    })
    return comment
  }

  static async createResponse(commentId, message) {
    const response = await database.response.create({
      data: {
        commentId,
        message
      }
    })
    return response
  }

  static async updateResponse(responseId, message) {
    const response = await database.response.update({
      where: {
        id: responseId
      },
      data: {
        message
      }
    })
    return response
  }
}

module.exports = ProductModel