import nodemailer from 'nodemailer';

const emailRegistro = async(datos) => {
const {email, nombre, token} = datos;

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

//Información del email
const info = await transport.sendMail({
    from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to:email,
    subject:"UpTask - Confirma tu cuenta",
    text:"Confirma tu cuenta en UpTask",
    html:`<p>Hola: ${nombre} confirma tu cuenta en UpTask.</p> 
    <p>Tu cuenta ya esta casi lista solo tienes que confirmarla en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>
    </p>
    <p>Si no creaste esta cuenta puedes ignorar este mensaje</p>
    `
})
}

const emailOlvidePassword = async(datos) => {
const {email, nombre, token} = datos;

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
//Información del email
const info = await transport.sendMail({
    from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to:email,
    subject:"UpTask -restablece tu password",
    text:"Restablece tu password de UpTask",
    html:`<p>Hola: ${nombre} has solicitado restablecer tu password.</p> 
    <p>En el siguiente enlace podrás generar un nuevo password para tu cuenta de UpTasñ:
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
    </p>
    <p>Si no solicitaste este email,  puedes ignorar este mensaje</p>
    `
})
}

export {emailRegistro, emailOlvidePassword}