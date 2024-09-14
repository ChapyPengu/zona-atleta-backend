class OrderMessage {
    constructor(orderMessage) {
        this.emisorId = orderMessage.emisorId
        this.receptorId = orderMessage.receptorId
        this.idOrder = orderMessage.idOrder
        this.message = orderMessage.message
        this.tipo = orderMessage.tipo//Si tipo es 0 = "Mensaje de cliente" si tipo es 1 = "Mensaje de Vendedor"
    }
}
    
module.exports = OrderMessage
  