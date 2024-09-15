const OrderMessageModel = require('../../data/models/order.model')
class OrderMessageController {
    static async getAll(req, res) {
        try {
          const orderMessages = await OrderMessageModel.findById(req.body.orderId)
          return res.json(orderMessages)
        } catch (e) {
          console.log(e)
          return res.status(500).json({ message: 'Server Error' })
        }
    }
    static async post(req, res) {
        const orderMessages = await OrderMessageModel.create({
            data: {
                orderId:req.body.orderId,
                message:req.body.message,
                vendedor:req.body.vendedor //Si es true el mensaje lo envia vendedor,  si es false lo envia comprador
            }
        })
        console.log(orderMessages)
        return res.json(orderMessages)
    }
}
module.exports = OrderMessageController