import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set')
      return NextResponse.json({ error: 'Server configuratie fout' }, { status: 500 })
    }

    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Onjuist wachtwoord' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 })
  }
}
