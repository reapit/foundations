import React, { useContext, useEffect, useState } from 'react'
import { H5, Grid, GridItem, Content, Section, Button, FadeIn, Loader, Helper } from '@reapit/elements'
import { PricingTile } from './__styles__/pricing-tile'
import { getSubscriptionsService } from '../../../services/subscriptions'
import { MessageContext } from '../../../context/message-context'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { getCurrentSubscription, handleSubscriptionToggle } from './subscriptions-handlers'

export const SubscriptionsContent: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModelPagedResult>()
  const [subscriptionsLoading, setSubscriptionsLoading] = useState<boolean>(false)
  const { setMessageState } = useContext(MessageContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = connectSession?.loginIdentity ?? null
  const developerId = connectSession?.loginIdentity?.developerId ?? null
  const currentSubscription = getCurrentSubscription(subscriptions, developerId)

  useEffect(() => {
    const getSubscriptions = async () => {
      setSubscriptionsLoading(true)
      const subscriptions = await getSubscriptionsService()
      setSubscriptionsLoading(false)
      if (subscriptions) {
        return setSubscriptions(subscriptions)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching subscriptions, please try again' })
    }
    if (developerId) {
      getSubscriptions()
    }
  }, [setSubscriptions, setSubscriptionsLoading, developerId])

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
                      {!developerId && (
                        <Helper>
                          You need to be a registered Reapit Developer to subscribe to the Data Warehouse. To register
                          as a developer visit <a href={window.reapit.config.developersUrl}>here</a>.
                        </Helper>
                      )}
                      {loginIdentity && (
                        <Section hasMargin={false}>
                          <Button
                            type="button"
                            variant="primary"
                            fullWidth
                            disabled={!developerId}
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
