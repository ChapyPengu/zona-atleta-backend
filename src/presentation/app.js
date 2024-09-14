const express = require('express')
const http = require('http')
const { Server: SocketServer } = require('socket.io')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const clientRoutes = require('./routes/client.routes')
const orderRoutes = require('./routes/order.routes')
const orderMessageRoutes = require('./routes/order.message.routes')

// const { auth } = require('express-openid-connect');

// const { requiresAuth } = require('express-openid-connect');


// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: '7sJ45RSH5x5guCxunmhRdeNIAbzIvEyS',
//   // issuerBaseURL: 'http://localhost:3000/'
//   issuerBaseURL: 'https://dev-jingjlbcz3bpta6j.us.auth0.com'
// };

const SocketManager = require('../data/clients/socket.manager')

const PROFILES = {
  CLIENT: 1,
  SALES_MANAGER: 2
}

const PORT = process.env.PORT ?? 3000
const CLIENT = process.env.CLIENT

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: CLIENT
  }
})

// auth router attaches /login, /logout, and /callback routes to the baseURL

// req.isAuthenticated is provided from the auth router

// app.use(auth(config));

app.use(cors({
  credentials: true,
  origin: CLIENT
}))
app.use(morgan('dev'))
app.use(cookieParser())
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename(req, file, cb) {
    cb(null, (new Date()).getTime() + path.extname(file.originalname))
  }
}) // Configuracion del storage de multer
app.use(multer({ storage }).single('image')) // Single por que es solo una imagen
app.use(express.urlencoded({ extended: false })) // Interpreta los datos de un formulario html como un json, muy util
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/product', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/order-message', orderMessageRoutes)
app.use(express.static(path.join(__dirname, '../../public')))

io.on('connection', socket => {
  socket.on('auth', ({ id, profile }) => {
    if (profile.id === PROFILES.CLIENT) {
      SocketManager.addClient({ id, socket })
    } else if ((profile.id === PROFILES.SALES_MANAGER) && (!SocketManager.salesManagerOnLine())) {
      SocketManager.setSalesManager({ id, socket })
    }
  })
  // socket.emit('notification', 'message')
})

module.exports = server