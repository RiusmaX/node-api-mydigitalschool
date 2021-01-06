const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'SendinBlue',
  auth: {
    user: 'cacahouette72@gmail.com',
    pass: 'PDwxU6tZ1Qj8kWbM'
  }
})

const sendMail = async (dest, message) => {
  let info = await transporter.sendMail({
    from: '"Marius Foo 👻" <foo@example.com>', // sender address
    to: dest, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: message // plain text body
  })

  console.log('Message sent: %s', JSON.stringify(info))
}

module.exports = SendMail = sendMail
