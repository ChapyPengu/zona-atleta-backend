const database = require('../database/database')
const OrderMessage = require('../interfaces/order.message')
class OrderMessageModel{
    static async findById(id) {
        const orderMessages = await database.orderMessage.findMany({
            where: {
                orderId: id
            }
        })
        return orderMessages.map(o => new OrderMessage(o))
    }
    static async cantNotifys(id){
        const orderMessages = await database.orderMessage.findMany({
            where: {
                orderId: id,
                view: false
            }
        })
        return orderMessages
    }
    static async create({orderId, message, vendedor}) {
        const orderMessages = await database.orderMessage.create({
          data: {
            orderId,
            message,
            vendedor //Si es false el mensaje lo envia el comprador, si es true lo envia el vendedor
          }
        })
        return orderMessages
    }
    static async putView(id, {view}){
        const orderMessages = await database.orderMessage.update({
            where: {
                orderId: id
            },
            data: {
              view
            }
        })
        return orderMessages
    }
}
module.exports = OrderMessageModel