const { Resend } = require('resend')

const BACKEND_URL = process.env.BACKEND_URL
const RESEND_TOKEN = process.env.RESEND_TOKEN
const resend = new Resend(RESEND_TOKEN)

async function sendEmailVerification(username, email, password) {
  const { data, error } = await resend.emails.send({
    from: 'Zona Atleta <zona.atleta@resend.dev>',
    to: [email],
    subject: 'Verifica tu correo electrónico',
    html: `
      <div style="max-width: 512px; margin: 0 auto; font-family: Arial,Helvetica,sans-serif; border: 1px solid rgba(0, 0, 0, .25); border-radius: .375rem;">
        <div style="padding: 32px; background-color: #ed3237; border-top-left-radius: .375rem; border-top-right-radius: .375rem; font-family: Arial,Helvetica,sans-serif">
          <h4 style="margin: 0; font-size: 32px; text-align: center; color: #ffffff; font-family: Arial,Helvetica,sans-serif;">Zona Atleta</h4>
          <h4 style="margin: 0; font-size: 24px; font-weight: 100; text-align: center; color: #ffffffaa; font-family: Arial,Helvetica,sans-serif;">Verifica correo electronico</h4>
        </div>
        <div style="padding: 32px; background-color: #ffffff; border-radius: .375rem; font-family: Arial,Helvetica,sans-serif;">
          <p style="margin: 4px 0; font-size: 16px; text-align: center; font-family: Arial,Helvetica,sans-serif;" class="email__text">Porfavor verifica tu correo electronico haciendo click en el siguente boton</p>
          <a style="border-radius: 10px; text-align: center; text-decoration:none;color:#f9f9f9; background-color: #ed3237; display:block;padding:16px 10px; font-weight: bold; font-family: Arial,Helvetica,sans-serif;" href="https://google.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://brubank.com/app/startup/confirm-email/20b1af05-39f0-4b9d-b955-19bd6f2a795f&amp;source=gmail&amp;ust=1726315228509000&amp;usg=AOvVaw2YvbGRSdqwoHoveXbvIIxz">VERIFICAR</a>
        </div>
      </div>`
  });

  return { data, error };
}

async function sendEmailRegister(to) {
  const { data, error } = await resend.emails.send({
    from: 'Zona Atleta <zona.atleta@resend.dev>',
    to: to,
    subject: 'Registro Exitoso!',
    html: '<p>Gracias por registrarte en Zona Atleta. ¡Esperamos que disfrutes la experiencia!</p>'
  });

  return { data, error };
}

async function sendEmailPasswordReset(to, resetLink) {
  const { data, error } = await resend.emails.send({
    from: 'Zona Atleta <zona.atleta@resend.dev>',
    to: to,
    subject: 'Restablece tu contraseña',
    html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace: <a href="${resetLink}">Restablecer contraseña</a></p>`
  });

  return { data, error };
}

async function sendEmailPurchaseConfirmation(to, orderDetails) {
  const { data, error } = await resend.emails.send({
    from: 'Zona Atleta <zona.atleta@resend.dev>',
    to: to,
    subject: 'Compra Confirmada',
    html: `<p>Gracias por tu compra en Zona Atleta. Aquí están los detalles de tu pedido:</p><p>${orderDetails}</p>`
  });

  return { data, error };
}

module.exports = {
  sendEmailVerification,
  sendEmailRegister,
  sendEmailPasswordReset,
  sendEmailPurchaseConfirmation
}