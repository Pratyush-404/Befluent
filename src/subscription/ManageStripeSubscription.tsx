import { isDev } from '../environment'
import React from 'react'

export const ManageStripeSubscription = () => {
  return (
    <a
      href={
        isDev
          ? 'https://billing.stripe.com/p/login/test_fZe6p49llcOKbgAbII'
          : 'https://billing.stripe.com/p/login/5kAbMC7lA4DigaA6oo'
      }
    >
      Manage Subscription on Stripe.com
    </a>
  )
}
