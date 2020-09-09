import * as React from 'react'
import { getOauthLink } from '../../stripe-api/oauth'
import { onBoardUser } from '../../stripe-api/onboard'

export type AuthenticatedProps = {}

export const Authenticated: React.FC<AuthenticatedProps> = () => {
  return (
    <>
      <div className="sr-root">
        <div className="sr-main">
          <div className="sr-onboarding-summary onboarding-view">
            <h1>Onboard an Express account with OAuth</h1>
          </div>
          <button id="submit" onClick={getOauthLink}>
            Onboard with OAuth
          </button>

          <div className="sr-payment-summary payment-view">
            <h1 className="order-amount">
              Setup payouts to list your home on Kavholm
            </h1>
          </div>

          <button id="submit" onClick={onBoardUser}>Setup payouts on Stripe</button>
        </div>
      </div>
    </>
  )
}

export default Authenticated
