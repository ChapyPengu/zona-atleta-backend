
class SocketManager {

  constructor() {
    this.clients = []
    this.salesManager = {}
    this.salesManagerConnection = false
  }
  
  addClient(socket) {
    this.clients.push(socket)
  }

  setSalesManager(socket) {
    this.salesManager = socket
    this.salesManagerConnection = true
  }

  salesManagerOnLine() {
    return this.salesManagerConnection
  }

  findClientById(id) {
    return this.clients.find(c => c.id === id)
  }
}

module.exports = new SocketManager()