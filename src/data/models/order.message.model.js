const database = require('../database/database')
const OrderMessage = require('../interfaces/order.message')
class OrderMessageModel{
    static async findManyById(id) {
        const orderMessages = await database.orderMessage.findMany({
            where: {
                orderId: id
            }
        })
        return orderMessages.map(o => new OrderMessage(o))
    }
    static async create({ message, orderId, vendedor}) {
        const orderMessages = await database.orderMessage.create({
          data: {
            orderId,
            message,
            vendedor //Si es false el mensaje lo envia el comprador, si es true lo envia el vendedor
          }
        })
        return orderMessages
    }
}
module.exports = OrderMessageModel