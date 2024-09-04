const PDFDocument = require('pdfkit-table')

const orderExample = {
  id: 1,
  date: '2005-01-11',
  state: 'Pendiente',
  totalPrice: 1000,
  paymentMethod: 'Mercado Pago',
  client: {
    id: 1,
    username: 'chapy77',
    email: 'chaparro.lautaro.et21.21@gmail.com'
  },
  products: [
    {
      id: 1,
      name: 'Pelota de futbol',
      category: 'futbol',
      price: 3000,
      amount: 4
    },
    {
      id: 1,
      name: 'Pelota de basketball',
      category: 'basketball',
      price: 1000,
      amount: 8
    },
    {
      id: 2,
      name: 'Camisa de river',
      category: 'futbol',
      price: 5000,
      amount: 2
    },
    {
      id: 4,
      name: 'Gorro de pisina',
      category: 'nadismo',
      price: 300,
      amount: 1
    }
  ]
}

export function createPDF(dataCallback, endCallback, order) {
  const doc = new PDFDocument({ margin: 32, size: 'A4' })

  doc.on('data', dataCallback)
  doc.on('end', endCallback)

  doc.fontSize(32).text('Recibo de Compra', {
    lineGap: 16
  })

  const table = {
    title: 'Productos de la compra',
    headers: ['ID', 'Nombre', 'Categoria', 'Precio', 'Cantidad', 'Precio Total'],
    rows: [
      ...order.products.map(p => ([p.id, p.name, p.category, p.price, p.amount, p.price * p.amount])),
      order.products.map(p => (['Total', '', '', '', order.products.reduce((acum, a) => acum + a.price, 0)]))
    ]
  }

  doc.table(table, {
    padding: 32
  })

  doc.end()
}