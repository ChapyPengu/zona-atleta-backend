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

  static async findMany(offset, limit, { name, category, gender }) {
    const products = await database.product.findMany({
      skip: offset,
      take: limit,
      where: {
        name: {
          contains: name
        },
        category: {
          name: category
        },
        gender
      }
    })
    return products.map(p => new ProductInterface(p))
  }

  static async findManyDiscount({ offset, limit }) {
    const discounts = await database.discount.findMany({
      skip: offset,
      take: limit,
      include: includeDiscountedProduct
    })
    return discounts.map(d => new DiscountedProduct(d))
  }

  static async findManyPopular({ offset, limit }) {
    const products = await database.product.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        visits: 'desc'
      }
    })
    return products.map(p => new ProductInterface(p))
  }

  static async findManyLast({ offset, limit }) {
    const last = await database.last.findMany({
      skip: offset,
      take: limit,
      include: includeLastProduct
    })
    return last.map(l => new LastProduct(l))
  }

  static async findById(id) {
    const p = await database.product.findFirst({
      where: {
        id
      },
      include: {
        category: true,
        comments: {
          include: {
            response: true
          }
        },
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

  static async createComment({ clientId, productId, message }) {
    const comment = await database.comment.create({
      data: {
        clientId,
        productId,
        message
      }
    })
    return comment
  }

  static async createResponse({ commentId, message }) {
    const response = await database.response.create({
      data: {
        commentId,
        message
      }
    })
    return response
  }

  static async updateResponse(responseId, { message, view  }) {
    const response = await database.response.update({
      where: {
        id: responseId
      },
      data: {
        message,
        view
      }
    })
    return response
  }


  //PUTVIEWRESPONSE()
  //Recibe el id de la respuesta 
  //Devuelve la respuesta marcada como vista ✔✔ por el cliente
  static async putViewResponse(clientId) {
    const response = await database.response.updateMany({
      where: {
        comment: {
          clientId
        }
      },
      data: {
        view: true
      }
    })
    return response
  }

  //GETNOTVIEWCOMMENT()
  //Devuelve todos los comentarios de los clientes que no fueron vistos por los vendedores
  static async getNotViewComment() {
    const comment = await database.comment.findMany({
      where: {
        view: false
      }
    })
    return comment
  }

  //GETNOTVIEWRESPONSE()
  //Recibe id que es igual al id del cliente
  //Devuelve todas las respuestas de los comentarios del cliente que no fueron vistas por el mismo
  static async getNotViewResponse(id) {
    const response = await database.response.findMany({
      where: {
        comment: {
          clientId: id
        },
        view: false
      }
    })
    return response
  }

  //PUTVIEWCOMMENT()
  //Recibe el id del comentario
  //Devuelve el comentario marcado como visto por el vendedor 
  static async putViewComment(id) {
    const comment = await database.comment.update({
      where: {
        id
      },
      data: {
        view: true
      }
    })
    return comment
  }
}

module.exports = ProductModel