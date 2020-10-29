import React, { useEffect, useState } from 'react'
import {
  Button,
  Section,
  H3,
  LevelRight,
  H5,
  Helper,
  Alert,
  Loader,
  Grid,
  Content,
  SubTitleH6,
  GridItem,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { getStripeOauthLink } from '../../payments-api/stripe'
import { getAccountByCustomerCode } from '../../payments-api/account'

export const Authenticated: React.FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState(false)
  const [accountId, setAccountId] = useState('')

  useEffect(() => {
    const fetchAccountId = async () => {
      const account = await getAccountByCustomerCode(connectSession?.loginIdentity.clientId as string)
      if (account && account.accountId) {
        setAccountId(account.accountId)
      }
      setLoading(false)
    }
    if (connectSession) {
      fetchAccountId()
    }
    setLoading(true)
  }, [connectSession])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <H3 isHeadingSection>Reapit Payments Portal</H3>
      {!accountId && (
        <Helper variant="info">
          Welome to Reapit Payments portal. It seems you dont currently have an account. To set up to receive payments
          first click the Register button below where you will be redirected to our payment provider Stripe. When you
          have set up an account, you will redirected to this page and will be able to make payments on a range of
          resources.
        </Helper>
      )}
      {accountId && (
        <>
          <Alert message="You have successfully registered for the Reapit Payment portal." type="success" />
          <Helper variant="info">
            You can now make payments on a range of resources from the left hand side menu.
          </Helper>
        </>
      )}
      <Section isFlexColumn>
        <LevelRight>
          {!accountId && connectSession && connectSession.loginIdentity.clientId && (
            <Button
              type="submit"
              onClick={() =>
                getStripeOauthLink(connectSession.loginIdentity.clientId as string, connectSession.loginIdentity.email)
              }
            >
              Register to receive payments
            </Button>
          )}
        </LevelRight>
        {accountId && (
          <>
            <H5>Your Stripe Account Details</H5>
            <Content>
              <Grid>
                <GridItem>
                  <SubTitleH6>Name</SubTitleH6>
                </GridItem>
                <GridItem>
                  <p>{connectSession?.loginIdentity.name}</p>
                </GridItem>
              </Grid>
              <Grid>
                <GridItem>
                  <SubTitleH6>Company Code</SubTitleH6>
                </GridItem>
                <GridItem>
                  <p>{connectSession?.loginIdentity.clientId}</p>
                </GridItem>
              </Grid>
              <Grid>
                <GridItem>
                  <SubTitleH6>Account Id</SubTitleH6>
                </GridItem>
                <GridItem>
                  <p>{accountId}</p>
                </GridItem>
              </Grid>
              <Grid>
                <GridItem>
                  <SubTitleH6>Username</SubTitleH6>
                </GridItem>
                <GridItem>
                  <p>{connectSession?.loginIdentity.email}</p>
                </GridItem>
              </Grid>
            </Content>
          </>
        )}
      </Section>
    </>
  )
}

export default Authenticated
