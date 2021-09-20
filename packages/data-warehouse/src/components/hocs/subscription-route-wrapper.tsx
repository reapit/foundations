import { Loader, Section } from '@reapit/elements-legacy'
import React, { Suspense } from 'react'
import { useSubscriptions } from '../hooks/use-subscriptions'
import { SubscriptionModal } from '../ui/subscription-modal'

type SubscriptionRouteWrapperProps = {}

export const SubscriptionRouteWrapper: React.FunctionComponent<SubscriptionRouteWrapperProps> = ({ children }) => {
  const { currentSubscription, subscriptionsLoading } = useSubscriptions()

  if (subscriptionsLoading) {
    return <Loader />
  }

  return (
    <>
      <SubscriptionModal visible={!currentSubscription} />
      {currentSubscription && (
        <Suspense
          fallback={
            <Section>
              <Loader />
            </Section>
          }
        >
          {children}
        </Suspense>
      )}
    </>
  )
}
