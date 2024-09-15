const database = require('../database/database')
const ProductInterface = require('../interfaces/product')
const ProductDetailsInterface = require('../interfaces/product.details')
const DiscountedProduct = require('../interfaces/discounted.product')
const LastProduct = require('../interfaces/last.product')

const includeProductDetails = {
  category: true,
  comments: {
    include: {
      response: true
    }
  },
  likes: true,
  favorites: true,
  discount: true
}

const includeDiscountedProduct = {
  product: true
}

const includeLastProduct = {
  product: true
}

class ProductModel {

  static async count() {
    return await database.product.count()
  }

  static async findMany({offset, limit}) {
    const products = await database.product.findMany({
      skip: offset,
      take: limit
    })
    return products.map(p => new ProductInterface(p))
  }

  static async findManyDiscount({offset, limit}) {
    const discounts = await database.discount.findMany({
      skip: offset,
      take: limit,
      include: includeDiscountedProduct
    })
    return discounts.map(d => new DiscountedProduct(d))
  }

  static async findManyPopular({offset, limit}) {
    const products = await database.product.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        visits: 'desc'
      }
    })
    return products.map(p => new ProductInterface(p))
  }

  static async findManyLast({offset, limit}) {
    const last = await database.last.findMany({
      skip: offset,
      take: limit,
      include: includeLastProduct
    })
    return last.map(l => new LastProduct(l))
  }

  static async findManyByCategory({name}, {offset, limit}) {
    const products = await database.product.findFirst({
      skip: offset,
      take: limit,
      where: {
        category: {
          name
        }
      }
    })
    return products.map(p => new ProductInterface(p))
  }

  static async findManyByName({name}, {offset, limit}) {
    const products = await database.product.findMany({
      skip: offset,
      take: limit,
      where: {
        name: {
          contains: name
        }
      }
    })
    return products.map(p => new ProductInterface(p))
  }

  static async findById(id) {
    const p = await database.product.findFirst({
      where: {
        id
      },
      include: {
        category: true,
        comments: true,
        discount: true,
        favorites: true,
        likes: true
      }
    })
    if (!p)
      return p
    return new ProductDetailsInterface(p)
  }

  static async create({ name, categoryId, price, stock, description, image, percentage, gender }) {
    let discount
    if (percentage) {
      discount = {
        create: {
          percentage
        }
      }
    }
    const product = await database.product.create({
      data: {
        name,
        categoryId,
        price,
        stock,
        description,
        image,
        last: {
          create: {}
        },
        discount,
        gender
      }
    })
    return product
    // return new ProductInterface(product)
  }

  static async update(id, { name, price, stock, available, timesBought, visits, image }) {
    const product = await database.product.update({
      where: {
        id
      },
      data: {
        name,
        price,
        stock,
        available,
        timesBought,
        visits,
        image
      }
    })
    return product
    // return new ProductDetailsInterface(product)
  }

  static async createComment({clientId, productId, message}) {
    const comment = await database.comment.create({
      data: {
        clientId,
        productId,
        message
      }
    })
    return comment
  }

  static async putViewComment(id,{view}){
    const comment = await database.comment.update({
      where:{
        id
      },
      data:{
        view
      }
    })
    return comment
  }

  static async createResponse({commentId, message}) {
    const response = await database.response.create({
      data: {
        commentId,
        message
      }
    })
    return response
  }

  static async updateResponse(responseId, {message}) {
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
  
  static async putViewResponse(id, {view}){
    const response = await database.response.update({
      where:{
        id
      },
      data:{
        view
      }
    })
    return response
  }
  static async getNotViewComment (id){
    const comment = await database.comment.findMany({
      where:{
        id,
        view: false
      }
    })
    return comment
  }
  static async getNotViewResponse (id){
    const response = await database.response.findMany({
      where:{
        id,
        view: false
      }
    })
    return response
  }
}

module.exports = ProductModel