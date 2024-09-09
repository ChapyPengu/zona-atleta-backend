const ClientModel = require('../../data/models/client.model')
const SalesManagerModel = require('../../data/models/sales-manager.model')
const { createAccesToken, verifyAccesToken } = require('../libs/jwt')
const { compare, hash } = require('../libs/bcrypt')

const PROFILES = {
  CLIENT: 1,
  SALES_MANAGER: 2
}

class AuthController {

  static async login(req, res) {
    try {
      const { username, password } = req.body
      const clientFound = await ClientModel.findByUsername(username)
      if (!clientFound)
        return res.status(403).json({ message: 'Nombre de usuario o contraseña incorrectos' })
      const match = await compare(password, clientFound.password)
      console.log(match)
      if (!match)
        return res.status(403).json({ message: 'Nombre de usuario o contraseña incorrectos' })
      const token = await createAccesToken({
        id: clientFound.id,
        username: clientFound.username,
        profile: clientFound.profile,
      })
      res.cookie('token', token)
      return res.status(200).json({ id: clientFound.id, username: clientFound.username, profile: clientFound.profile })
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
        username: salesManagerFound.username,
        profile: salesManagerFound.profile,
      })
      res.cookie('token', token)
      return res.status(200).json({ id: salesManagerFound.id, username: salesManagerFound.username, profile: salesManagerFound.profile })
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
      const encrypt = await hash(password)
      const newClient = await ClientModel.create(username, email, encrypt)
      const token = await createAccesToken({
        id: newClient.id,
        username: newClient.username,
        profile: newClient.profile,
      })
      res.cookie('token', token)
      return res.status(200).json({ id: newClient.id, username: newClient.username, profile: newClient.profile })
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
      return res.status(401).json({ message: 'No token' })

    const { id, username, profile } = await verifyAccesToken(token)

    if (profile.id === PROFILES.CLIENT) {
      const client = await ClientModel.findById(id)
      if (!client)
        return res.status(400).json({ message: 'Token no valido' })
      return res.json({ id, username, profile })
    }

    const salesManager = await SalesManagerModel.findById(id)

    if (!salesManager)
      return res.status(400).json({ message: 'Token no valido' })

    return res.json({ id, username, profile })
  }
}

module.exports = AuthController