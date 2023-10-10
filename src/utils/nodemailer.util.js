import nodemailer from 'nodemailer';
export default async function sendMail(emailAdd, subject, content) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.dreamhost.com',
    port: 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: emailAdd,
    subject: subject,
    html: content,
  };
  await transporter.sendMail(mailOptions);
  transporter.close();
}
