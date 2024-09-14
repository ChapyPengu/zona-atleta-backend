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
    static async create({ message, emisorId, receptorId, orderId, tipo}) {
        const orderMessages = await database.orderMessage.create({
          data: {
            emisorId,
            receptorId,
            orderId,
            message,
            tipo//Siendo tipo 0 si es mensaje del cliente y 1 si es mensaje del vendedor
          }
        })
        return orderMessages
    }
}
module.exports = OrderMessageModel