import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Geen bestand geüpload' }, { status: 400 })
    }

    // Check bestandstype
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Alleen JPG, PNG, WebP en GIF bestanden zijn toegestaan' },
        { status: 400 }
      )
    }

    // Check bestandsgrootte (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Bestand is te groot (max 5MB)' },
        { status: 400 }
      )
    }

    // Genereer unieke bestandsnaam
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `recipe-${timestamp}-${randomString}.${extension}`

    // Upload naar Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: filename
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het uploaden. Controleer of BLOB_READ_WRITE_TOKEN is ingesteld.' },
      { status: 500 }
    )
  }
}
