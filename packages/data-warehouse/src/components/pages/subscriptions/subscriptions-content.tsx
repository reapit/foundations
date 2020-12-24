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
                Access is licensed by monthly subscription at a cost of £150 per month, inclusive of two hours of
                warehouse uptime for each month. Warehouse uptime beyond 2 hours is billed at cost of £6.99 per hour.
              </p>
              <p>
                The below table represents the estimated cost of running a typical sales activity report for a given
                frequency over the course of a month:
              </p>
              <p>Actual cost will vary depending on database size, report complexity and number of concurrent users.</p>
              <p>
                Price estimations exclusive of VAT. For more information on data warehouse pricing, please click here.
              </p>
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
                      <div className="text-center px-2 py-1">Includes 2 hours per month warehouse uptime</div>
                      <div className="text-center px-2 py-1">Only pay for the uptime you need after that</div>
                      <div className="text-center px-2 py-1">Track your usage and set spending limits</div>
                      <div className="text-center px-2 py-1">Dedicated virtual warehouse for your organisation</div>
                      <div className="text-center px-2 py-1">Supports all major BI products</div>
                      <div className="text-center px-2 py-1">Enterprise grade encryption in transit and at rest</div>
                      <div className="text-center px-2 py-1">Data kept up to date at 15 minute intervals</div>
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
