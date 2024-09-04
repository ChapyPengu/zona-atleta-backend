const database = require('../database/database')

class SalesManagerModel {

  static async findOne({ username, password }) {
    const fonud = await database.salesManager.findFirst({
      where: {
        username,
        password
      },
      include: {
        profile: true
      }
    })
    return fonud
  }

  static async findById(id) {
    const salesManager = await database.salesManager.findFirst({
      where: {
        id
      },
      include: {
        profile: true
      }
    })
    return salesManager
  }

  static async findByUsernameAndPassword(username, password) {
    const salesManager = await database.salesManager.findFirst({
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
      include: {
        profile: true
      }
    })
    return salesManager
  }
}

module.exports = SalesManagerModel