const express = require('express')
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

const app = express()

const PORT = process.env.PORT ?? 3000
const CLIENT = process.env.CLIENT

app.set('port', PORT)

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
})
app.use(multer({ storage }).single('image')) // Single por que es solo una imagen
app.use(express.urlencoded({ extended: false })) // Interpreta los datos de un formulario html como un json, muy util
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/product', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)

app.use(express.static(path.join(__dirname, '../../public')))

module.exports = app