const OrderMessageModel = require('../../data/models/order.message.model')
class OrderMessageController {
    static async getAll(req, res) {
        try {
          const id = parseInt(req.params.id)
          const orderMessages = await OrderMessageModel.findById(id)
          return res.json(orderMessages)
        } catch (e) {
          console.log(e)
          return res.status(500).json({ message: 'Server Error' })
        }
    }
    static async getNotView(req,res){
        const id = parseInt(req.params.id)
        const orderMessages = await OrderMessageModel.cantNotifys(id)
        return res.json(orderMessages)
    }
    static async post(req, res) {
        try{
            const {orderId ,message, vendedor} = req.body
            const orderMessages = await OrderMessageModel.create({orderId,message,vendedor})
            return res.json(orderMessages)
        }catch (e){
            console.log(e)
            return res.status(500).json({message: 'Server Error'})
        }
    }
    static async put(req,res){
        try{
            const id = parseInt(req.params.id)
            const orderMessages = await OrderMessageModel.putView(id, true)
            return res.json(orderMessages)
        }catch (e){
            console.log(e)
            return res.status(500).json({message: 'Server Error'})
        }
    }
}
module.exports = OrderMessageController