const database = require('../database/database')

class CommentModel {

  static async findMany({ productId }) {
    const comments = await database.comment.findMany({
      where: {
        productId
      }
    })
    return comments 
  }

  static async create({ productId, clientId, message }) {
    const comment = await database.comment.create({
      data: {
        productId,
        clientId,
        message
      }
    })
    return comment 
  }
}

module.exports = CommentModel