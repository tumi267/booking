import nodemailer from 'nodemailer'

type SendContactEmailProps = {
  name: string
  email: string
  message: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendContactEmail({
  name,
  email,
  message,
}: SendContactEmailProps) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,

    subject: `New Contact Enquiry from ${name}`,

    text: `
New contact enquiry

Name: ${name}
Email: ${email}

Message:
${message}
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Enquiry</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${message.replace(/\n/g, '<br />')}
        </p>
      </div>
    `,
  })
}