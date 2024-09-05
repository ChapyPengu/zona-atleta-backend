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
        name: 'botines'
      },
      {
        name: 'training'
      },
      {
        name: 'moda'
      },
      {
        name: 'futbol'
      },
      {
        name: 'rugby'
      },
      {
        name: 'voley'
      },
      {
        name: 'hockey'
      },
      {
        name: 'basquet'
      },
      {
        name: 'tenis'
      },
      {
        name: 'padel'
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

async function main() {
  try {
    console.log(await createProfiles())
    console.log(await createCategories())
    console.log(await createSalesManager('lucas77', 'lucas123'))
  } catch (e) {
    console.log(e)
  }
}

// main()

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log('Server on port', PORT)
})