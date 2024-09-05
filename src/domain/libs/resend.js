const { Resend } = require('resend')

const RESEND_TOKEN = process.env.RESEND_TOKEN || ''
const resend = new Resend(RESEND_TOKEN)

async function sendEmail(to) {
  const { data, error } = await resend.emails.send({
    from: 'Zona Atleta <zona.atleta@resend.dev>',
    to: ['chaparro.lautaro.et21.21@gmail.com'],
    subject: 'hello world',
    html: '<p>Hello friend</p>'
  })

  return { data, error }
}

module.exports = {
  sendEmail
}