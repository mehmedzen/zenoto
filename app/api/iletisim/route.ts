import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ad, telefon, email, mesaj, arac_id } = body

    if (!ad || !telefon || !mesaj) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    // ----- Supabase'e kaydet (aktif olduğunda) -----
    // const { error } = await supabaseAdmin
    //   .from('iletisim_formlari')
    //   .insert({ ad, telefon, email, mesaj, arac_id })
    // if (error) throw error

    // ----- E-posta gönder (Resend entegrasyonu) -----
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'OtoSeç <bildirim@otosec.com.tr>',
    //   to: 'info@otosec.com.tr',
    //   subject: `Yeni İletişim Formu: ${ad}`,
    //   html: `<p><strong>Ad:</strong> ${ad}</p>
    //          <p><strong>Telefon:</strong> ${telefon}</p>
    //          <p><strong>E-posta:</strong> ${email || '-'}</p>
    //          <p><strong>Mesaj:</strong> ${mesaj}</p>`
    // })

    // Geliştirme ortamında konsola bas
    console.log('Yeni form başvurusu:', { ad, telefon, email, mesaj, arac_id })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Form hatası:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
