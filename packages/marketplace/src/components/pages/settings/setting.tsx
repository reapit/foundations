import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { H3, Button, Section, Grid, GridItem, H6 } from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { selectClientId } from '@/selector/auth'
import { selectUpdatePasswordLoading } from '@/selector/cognito-identity'
import { changePassword } from '@/actions/cognito-identity'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'

export type CreateDispatchersReturn = {
  changePassword: (values: ChangePasswordValues) => void
  logout: () => void
}

export const createDispatchers = (
  dispatch: Dispatch,
  connectSession: ReapitConnectSession | null,
): CreateDispatchersReturn => {
  return {
    changePassword: (values: ChangePasswordValues) =>
      dispatch(
        changePassword({
          ...values,
          email: connectSession?.loginIdentity.email || '',
        }),
      ),
    logout: () => reapitConnectBrowserSession.connectLogoutRedirect(),
  }
}

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const customerId = selectClientId(connectSession)
  const { changePassword, logout } = createDispatchers(dispatch, connectSession)
  const loading = useSelector(selectUpdatePasswordLoading)

  return (
    <>
      <Section isFlex className="justify-between items-center">
        <H3 className="mb-0">Settings</H3>
        {!connectIsDesktop && (
          <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
            Logout
          </Button>
        )}
      </Section>
      <Section>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>Name:</GridItem>
              <GridItem>
                <H6>John Smith</H6>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid>
              <GridItem>Email Address:</GridItem>
              <GridItem>
                <H6>johnsmith@agent.com</H6>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>Company:</GridItem>
              <GridItem>
                <H6>Agent Ltd</H6>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid>
              <GridItem>Customer ID:</GridItem>
              <GridItem>
                <H6>{customerId}</H6>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>Company Address:</GridItem>
              <GridItem>
                <H6>1 Street, Town, AB1 2CD</H6>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem />
        </Grid>
      </Section>
      <ChangePasswordForm changePassword={changePassword} loading={loading} />
    </>
  )
}

export default Settings
