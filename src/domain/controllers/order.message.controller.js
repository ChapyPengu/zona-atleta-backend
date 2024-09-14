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
                emisorId:req.body.emisorId,
                receptorId:req.body.receptorId,
                orderId:req.body.orderId,
                message:req.body.message,
                tipo:req.body.tipo//Siendo tipo 0 si es mensaje del cliente y 1 si es mensaje del vendedor
            }
        })
        console.log(orderMessages)
        return res.json(orderMessages)
    }
}
module.exports = OrderMessageController