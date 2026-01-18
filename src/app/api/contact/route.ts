import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validatie
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Alle velden zijn verplicht' },
        { status: 400 }
      )
    }

    // Email configuratie - LET OP: createTransport (niet createTransporter!)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'iwanvandenenk@gmail.com',
      subject: `[NuKoken Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            Nieuw bericht via NuKoken
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Van:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Onderwerp:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Bericht:</h3>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #f97316; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Dit bericht is verzonden via het contactformulier op NuKoken.nl
          </p>
        </div>
      `,
      replyTo: email,
    }

    // Verstuur email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email succesvol verzonden' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het versturen van de email' },
      { status: 500 }
    )
  }
}