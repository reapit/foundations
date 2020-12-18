import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { H5, Grid, GridItem, Content, Section, Button, FadeIn, Loader, Helper } from '@reapit/elements'
import { PricingTile } from './__styles__/pricing-tile'
import {
  createSubscriptionsService,
  deleteSubscriptionsService,
  getSubscriptionsService,
} from '../../../services/subscriptions'
import { MessageContext, MessageState } from '../../../context/message-context'
import { SubscriptionModel, SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { LoginIdentity, useReapitConnect } from '@reapit/connect-session'

export const handleSubscriptionToggle = (
  currentSubscription: SubscriptionModel | null,
  loginIdentity: LoginIdentity,
  setMessageState: Dispatch<SetStateAction<MessageState>>,
  setSubscriptions: Dispatch<SetStateAction<SubscriptionModelPagedResult | undefined>>,
) => async () => {
  const { developerId, clientId, email } = loginIdentity

  if (!developerId || !clientId || !email) return

  if (currentSubscription && currentSubscription.id) {
    const deleted = await deleteSubscriptionsService(currentSubscription.id)

    if (deleted) {
      const subscriptions = await getSubscriptionsService()
      if (subscriptions) {
        setSubscriptions(subscriptions)
      }
      return setMessageState({ infoMessage: 'Successfully unsubscribed' })
    }

    return setMessageState({ errorMessage: 'Something went wrong unsubscribing' })
  }

  const created = createSubscriptionsService({
    developerId,
    applicationId: '',
    user: email,
    customerId: clientId,
    type: 'dataWarehouse',
  })

  if (created) {
    // Required to avoid a race condition where a fetch on subscriptions does not return
    // the subscription immediately after it has been created. Delay the fetch by 500ms
    // to allow the endpoint to catch up!
    setTimeout(async () => {
      const subscriptions = await getSubscriptionsService()
      if (subscriptions) {
        setSubscriptions(subscriptions)
      }
    }, 500)
    return setMessageState({ infoMessage: 'Successfully subscribed' })
  }
  return setMessageState({ errorMessage: 'Something went wrong subscribing' })
}

export const SubscriptionsContent: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModelPagedResult>()
  const [subscriptionsLoading, setSubscriptionsLoading] = useState<boolean>(false)
  const { setMessageState } = useContext(MessageContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = connectSession?.loginIdentity ?? null
  const developerId = connectSession?.loginIdentity?.developerId ?? null
  const currentSubscription =
    subscriptions?.data?.length && Boolean(developerId)
      ? subscriptions?.data.find(
          sub => sub.developerId === developerId && sub.type === 'dataWarehouse' && !sub.cancelled,
        ) ?? null
      : null

  useEffect(() => {
    const getSubscriptions = async () => {
      setSubscriptionsLoading(true)
      const subscriptions = await getSubscriptionsService()
      setSubscriptionsLoading(false)
      if (subscriptions) {
        return setSubscriptions(subscriptions)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching accounts, please try again' })
    }
    getSubscriptions()
  }, [setSubscriptions, setSubscriptionsLoading])

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
