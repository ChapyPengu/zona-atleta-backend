const database = require('../database/database')

const clientInclude = {
  profile: true
}

const clientProductInclude = {
  product: {
    include: {
      category: true
    }
  }
}

const orderInclude = {
  products: {
    include: {
      product: true
    }
  }
}

const favoriteInclude = {
  product: true
}

class ClientModel {

  static async findMany() {
    const client = await database.client.findMany({
      include: clientInclude
    })
    return client
  }

  static async findById(id) {
    const client = await database.client.findFirst({
      where: {
        id
      },
      include: clientInclude
    })
    return client
  }

  static async findByUsernameAndPassword(username, password) {
    const client = await database.client.findFirst({
      where: {
        AND: [
          {
            username: {
              equals: username
            }
          },
          {
            password: {
              equals: password
            }
          }
        ]
      },
      include: clientInclude
    })
    return client
  }

  static async findByUsernameOrEmail(username, email) {
    const client = await database.client.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: username
            }
          },
          {
            email: {
              equals: email
            }
          }
        ]
      },
      include: clientInclude
    })
    return client
  }

  static async create(username, email, password) {
    const client = await database.client.create({
      data: {
        username,
        email,
        password,
        profileId: 1
      },
      include: clientInclude
    })
    return client
  }

  static async delete(id) {
    const client = await database.client.delete({
      where: {
        id
      },
      include: clientInclude
    })
    return client
  }

  static async update(id, username, password) {
    const client = await database.client.update({
      where: {
        id
      },
      data: {
        username,
        password
      },
      include: clientInclude
    })
    return client
  }

  static async findProducts(id) {
    const products = await database.clientProduct.findMany({
      where: {
        clientId: id
      },
      include: clientProductInclude
    })
    return products.map(p => ({...p.product, amount: p.amount}))
  }

  static async createProduct(id, productId, amount) {
    const product = await database.clientProduct.create({
      data: {
        clientId: id,
        productId,
        amount
      },
      include: clientProductInclude
    })
    return product
  }

  static async deleteProduct(id, productId) {
    const product = await database.clientProduct.delete({
      where: {
        productId_clientId: {
          clientId: id,
          productId
        }
      },
      include: clientProductInclude
    })
    return product
  }

  static async updateProduct(id, productId, amount) {
    const product = await database.clientProduct.update({
      where: {
        productId_clientId: {
          clientId: id,
          productId
        }
      },
      data: {
        amount
      },
      include: clientProductInclude
    })
    return product
  }

  static async findOrders(id) {
    const orders = await database.order.findMany({
      where: {
        clientId: id
      },
      include: orderInclude
    })
    return orders
  }

  static async createOrder(id, paymentMethod, paymentId, address, products) {
    const order = await database.order.create({
      data: {
        paymentMethod,
        paymentId,
        address,
        clientId: id,
        products: {
          create: products
        }
      },
      include: orderInclude
    })
    return order
  }

  static async deleteProduct(id, productId) {
    const product = await database.clientProduct.delete({
      where: {
        productId_clientId: {
          clientId: id,
          productId
        }
      },
      include: clientProductInclude
    })
    return product
  }

  static async deleteManyProduct(id) {
    const products = await database.clientProduct.deleteMany({
      where: {
        clientId: id
      }
    })
    return products
  }

  static async updateProduct(id, productId, amount) {
    const product = await database.clientProduct.update({
      where: {
        productId_clientId: {
          clientId: id,
          productId
        }
      },
      data: {
        amount
      },
      include: clientProductInclude
    })
    return product
  }

  static async createLike(id, productId) {
    const like = await database.like.create({
      data: {
        clientId: id,
        productId
      }
    })
    return like
  }

  static async deleteLike(id, productId) {
    const like = await database.like.delete({
      where: {
        clientId_productId: {
          clientId: id,
          productId
        }
      }
    })
    return like
  }

  static async findFavorites(id) {
    const favorite = await database.favorite.findMany({
      where: {
        clientId: id
      },
      include: favoriteInclude
    })
    return favorite
  }

  static async createFavorite(id, productId) {
    const favorite = await database.favorite.create({
      data: {
        clientId: id,
        productId
      },
      include: favoriteInclude
    })
    return favorite
  }

  static async deleteFavorite(id, productId) {
    const favorite = await database.favorite.delete({
      where: {
        clientId_productId: {
          clientId: id,
          productId
        }
      },
      include: favoriteInclude
    })
    return favorite
  }

  static async createNotification(id, message) {
    const notification = await database.notification.create({
      data: {
        clientId: id,
        message
      }
    })
    return notification
  }

  static async findNotifications(id) {
    const notifications = await database.notification.findMany({
      where: {
        clientId: id
      },
      skip: 4,
    })
    return notifications
  }
}

module.exports = ClientModel