import { corsHeaders } from '../cors.ts'

const RESEND = Deno.env.get('RESEND')

Deno.serve(async (req) => {
  const { html } = await req.json()
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND}`,
    },
    body: JSON.stringify({
      from: 'Supa <supa@resend.befluent.ai>',
      to: ['steve@befluent.ai'],
      subject: 'hello world',
      html,
    }),
  })

  if (res.ok) {
    return new Response('Email sent successfully', { headers: corsHeaders })
  } else {
    const error = await res.json()
    return new Response(`Failed to send email: ${error.message}`, {
      headers: corsHeaders,
      status: 500,
    })
  }
})
