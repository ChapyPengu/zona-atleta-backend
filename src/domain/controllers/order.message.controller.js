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
        try{
            const id = parseInt(req.params.id)
            const tipo = req.body.vendedor
            const orderMessages = await OrderMessageModel.cantNotifys(id, {tipo})
            return res.json(orderMessages)
        }catch(e){
            console.log(e)
            return res.status(500).json({message: 'Server Error'})
        }
    }
    
    static async post(req, res) {
        try{
            const id = parseInt(req.params.orderId)
            const {message, vendedor} = req.body
            const orderMessages = await OrderMessageModel.create(id, {message,vendedor})
            return res.json(orderMessages)
        }catch(e){
            console.log(e)
            return res.status(500).json({message: 'Server Error'})
        }
    }

    static async putView(req,res){
        try{
            const id = parseInt(req.params.orderId)
            const view = JSON.stringify({view:true})
            const orderMessages = await OrderMessageModel.putViewOrderMessage(id, {view})
            return res.json(orderMessages)
        }catch(e){
            console.log(e)
            return res.status(500).json({message: 'Server Error'})
        }
    }
}
module.exports = OrderMessageController