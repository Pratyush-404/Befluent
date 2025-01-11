import { corsHeaders } from '../cors.ts'
import Stripe from 'npm:stripe'

const stripe = new Stripe(Deno.env.get('STRIPE_KEY') || '', {
  apiVersion: '2024-04-10',
})
//returns 'none', 'active', or 'inactive'
Deno.serve(async (req) => {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get('email') || ''

    // Retrieve the customer
    const customers = await stripe.customers.list({ email: email, limit: 1 })
    const customer = customers.data[0]
    if (customer === undefined)
      return new Response('none', { headers: corsHeaders })

    // Retrieve the subscriptions of the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
    })
    const subscription = subscriptions.data[0]
    if (subscription === undefined)
      return new Response('none', { headers: corsHeaders })
    const isActive =
      subscription.status === 'active' || subscription.status === 'trialing'
    return new Response(isActive ? 'active' : 'inactive', {
      headers: corsHeaders,
    })
  } catch (e) {
    return new Response('none', { headers: corsHeaders })
  }
})
