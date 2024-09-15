class OrderMessage {
    constructor(orderMessage) {
        this.emisorId = orderMessage.emisorId
        this.receptorId = orderMessage.receptorId
        this.idOrder = orderMessage.idOrder
        this.message = orderMessage.message
        this.vendedor = orderMessage.vendedor//Si es false el mensaje lo envia el comprador, si es true lo envia el vendedor
    }
}
    
module.exports = OrderMessage
  