import React, { useContext, useEffect, useState } from 'react'
import { H5, Grid, GridItem, Content, Section, Button, FadeIn, Loader } from '@reapit/elements'
import { PricingTile } from './__styles__/pricing-tile'
import { MessageContext } from '../../../context/message-context'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { getCurrentSubscription, handleGetSubscriptions, handleSubscriptionToggle } from './subscriptions-handlers'

const SubscriptionsContent: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModelPagedResult>()
  const [subscriptionsLoading, setSubscriptionsLoading] = useState<boolean>(false)
  const { setMessageState } = useContext(MessageContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = connectSession?.loginIdentity ?? null
  const clientId = connectSession?.loginIdentity?.clientId ?? null
  const currentSubscription = getCurrentSubscription(subscriptions)

  useEffect(handleGetSubscriptions(setSubscriptions, setSubscriptionsLoading, setMessageState, connectSession), [
    setSubscriptions,
    setSubscriptionsLoading,
    connectSession,
  ])

  return (
    <FadeIn>
      <Section>
        <Content>
          <Grid>
            <GridItem>
              <H5>Pricing</H5>
              <p>
                Access requires a subscription plus usage costs based on your warehouse consumption. You can cancel your
                subscription at any time.
              </p>
              <p>
                A subscription for your organisation costs £150 per month. Additional costs are calculated based on the
                number of hours of that your warehouse is active in a given month, charged at £6.99 per hour. Your
                subscription includes 2 hours of warehouse uptime per month.
              </p>
              <p>
                Your warehouse will become active when queries are issued against it. You will be billed by the minute
                while your warehouse is in an active state and ready to serve data. After a short period of inactivity,
                the warehouse will enter a sleep state. No usage costs are accrued when the warehouse is sleeping.{' '}
              </p>
              <p>
                The below table represents the estimated cost of running a typical sales activity report for a given
                frequency over the course of a month:
              </p>
              <p>* All charges are subject to VAT</p>
            </GridItem>
            <GridItem>
              <PricingTile>
                <div className="desktop-inner-container">
                  <div className="modal-card-head">
                    <H5 className="mb-0" isCentered>
                      Data Warehouse Service
                    </H5>
                  </div>
                  {subscriptionsLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="justify-center items-center is-flex py-2">
                        <span className="desktop-price">{currentSubscription ? 'Subscribed' : '£150 / Month'}</span>
                        &nbsp;
                      </div>
                      <ul>
                        <li className="text-center px-2 py-1">Includes 2 hours per month warehouse uptime</li>
                        <li className="text-center px-2 py-1">Only pay for the uptime you need after that</li>
                        <li className="text-center px-2 py-1">Track your usage and set spending limits</li>
                        <li className="text-center px-2 py-1">Dedicated virtual warehouse for your organisation</li>
                        <li className="text-center px-2 py-1">Supports all major BI products</li>
                        <li className="text-center px-2 py-1">Enterprise grade encryption in transit and at rest</li>
                        <li className="text-center px-2 py-1">Data kept up to date at 30-minute intervals</li>
                        <li className="text-center px-2 py-1">Cancel your subscription at any time</li>
                      </ul>
                      {loginIdentity && (
                        <Section hasMargin={false}>
                          <Button
                            type="button"
                            variant="primary"
                            fullWidth
                            disabled={!clientId}
                            onClick={handleSubscriptionToggle(
                              currentSubscription,
                              loginIdentity,
                              setMessageState,
                              setSubscriptions,
                            )}
                          >
                            {currentSubscription ? 'Unsubscribe' : 'Subscribe'} now
                          </Button>
                        </Section>
                      )}
                    </>
                  )}
                </div>
              </PricingTile>
            </GridItem>
          </Grid>
        </Content>
      </Section>
    </FadeIn>
  )
}

export default SubscriptionsContent
