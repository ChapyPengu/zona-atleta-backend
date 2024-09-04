const app = require('./presentation/app')
const database = require('./data/database/database')

const PORT = process.env.PORT || 3000

async function createProfiles() {
  const profiles = await database.profile.createMany({
    data: [
      {
        name: 'client'
      },
      {
        name: 'sales manager'
      }
    ]
  })
  return profiles
}

async function createSalesManager(username, password) {
  const salesManager = await database.salesManager.create({
    data: {
      username,
      password,
      profileId: 2
    }
  })
  return salesManager
}

async function main() {
  try {
    console.log(await createSalesManager('lucas77', 'lucas123'))
  } catch (e) {
    console.log(e)
  }
}

// main()

app.listen(3000, () => {
  console.log('Server on port', PORT)
})