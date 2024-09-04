const ClientModel = require('../../data/models/client.model')
const SalesManagerModel = require('../../data/models/sales-manager.model')
const { createAccesToken, verifyAccesToken } = require('../libs/jwt')

const PROFILES = {
  CLIENT: 1,
  SALES_MANAGER: 2
}

class AuthController {

  static async login(req, res) {
    try {
      const { username, password } = req.body
      const clientFound = await ClientModel.findByUsernameAndPassword(username, password)
      console.log(clientFound)
      if (!clientFound)
        return res.status(403).json({ message: 'Nombre de usuario o contraseña incorrectos' })
      const token = await createAccesToken({
        id: clientFound.id,
        profile: {
          id: clientFound.profile.id,
          name: clientFound.profile.name
        }
      })
      res.cookie('token', token)
      return res.status(200).json(clientFound)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async loginSalesManager(req, res) {
    try {
      const { username, password } = req.body
      const salesManagerFound = await SalesManagerModel.findByUsernameAndPassword(username, password)
      if (!salesManagerFound)
        return res.status(403).json({ message: 'Nombre de usuario o contraseña incorrectos' })
      const token = await createAccesToken({
        id: salesManagerFound.id,
        profile: {
          id: salesManagerFound.profile.id,
          name: salesManagerFound.profile.name
        }
      })
      res.cookie('token', token)
      return res.status(200).json(salesManagerFound)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password } = req.body
      const clientFound = await ClientModel.findByUsernameOrEmail(username, email)
      if (clientFound)
        return res.status(403).json({ message: 'Nombre de usuario o correo electronico en uso' })
      const newClient = await ClientModel.create(username, email, password)
      const token = await createAccesToken({
        id: newClient.id,
        profile: {
          id: newClient.profile.id,
          name: newClient.profile.name
        }
      })
      res.cookie('token', token)
      return res.status(200).json(newClient)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Server error' })
    }
  }

  static async logout(req, res) {
    res.cookie('token', '', {
      expires: new Date(0)
    })
    return res.sendStatus(200)
  }

  static async verify(req, res) {
    const { token } = req.cookies
    if (!token)
      return res.status(401).json({ message: 'No token pa' })
    const { id, profile } = await verifyAccesToken(token)
    if (profile.id === PROFILES.CLIENT) {
      const client = await ClientModel.findById(id)
      if (!client)
        return res.status(400).json({ message: 'El usuario no existe' })
      return res.json(client)
    }
    const salesManager = await SalesManagerModel.findById(id)
    if (!salesManager)
      return res.status(400).json({ message: 'El usuario no existe' })
    return res.json(salesManager)
  }
}

module.exports = AuthController