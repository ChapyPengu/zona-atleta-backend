const app = require('./presentation/app')
const database = require('./data/database/database')

async function createProfiles() {
  return await database.profile.createMany({
    data: [
      {
        name: 'client'
      },
      {
        name: 'sales manager'
      }
    ]
  })
}

async function createCategories() {
  return await database.category.createMany({
    data: [
      {
        name: 'hockey'
      },
      {
        name: 'tenis'
      },
      {
        name: 'moda'
      },
      {
        name: 'training'
      },
      {
        name: 'natacion'
      },
      {
        name: 'running'
      },
      {
        name: 'basquet'
      },
      {
        name: 'futbol'
      }
    ]
  })
}

async function createSalesManager(username, password) {
  return await database.salesManager.create({
    data: {
      username,
      password,
      profileId: 2
    }
  })
}

async function deleteManyProducts() {
  await database.last.deleteMany()
  await database.discount.deleteMany()
  await database.comment.deleteMany()
  await database.favorite.deleteMany()
  await database.like.deleteMany()
  await database.productOrder.deleteMany()
  await database.clientProduct.deleteMany()
  return await database.product.deleteMany()
}


async function main() {
  try {
    // console.log(await createProfiles())
    // console.log(await createCategories())
    // console.log(await createSalesManager('lucas77', 'lucas123'))
    // console.log(await deleteManyProducts())
    // console.log(await database.discount.findMany())
  } catch (e) {
    console.log(e)
  }
}

// main()
// database.order.update({
//   where: {
//     id: 3
//   },
//   data: {
//     state: 'pago aprobado'
//   }
// }).then(res => console.log(res))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log('Server on port', PORT)
})