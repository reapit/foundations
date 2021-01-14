import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { H3, Button, Section, Grid, GridItem, SubTitleH6 } from '@reapit/elements'
import { LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import {
  selectClientId,
  selectLoggedUserEmail,
  selectLoggedUserName,
  selectLoggedUserCompanyName,
  selectIsAdmin,
} from '@/selector/auth'
import { selectUpdatePasswordLoading } from '@/selector/cognito-identity'
import { changePassword } from '@/actions/cognito-identity'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import * as styles from './__styles__'
import InstallationsTable from './installations-table'

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

const roles = {
  FoundationsDeveloper: 'App Developer',
  AgencyCloudDeveloperEdition: 'Developer Edition Subscriber',
  FoundationsDeveloperAdmin: 'Developer Admin',
  ReapitEmployee: 'Reapit Employee',
  ReapitUser: 'User',
  MarketplaceAdmin: 'Marketplace Admin',
  ReapitUserAdmin: 'User Admin',
  OrganisationAdmin: 'Organisation Admin',
}

const getCompanyRoles = (loginIdentity?: LoginIdentity): string => {
  if (!loginIdentity) return ''
  return loginIdentity?.groups.reduce((acc, curr) => {
    const role = roles[curr]
    if (!acc && role) return role
    if (!role) return acc
    return `${acc}, ${role}`
  }, '')
}

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const { changePassword, logout } = createDispatchers(dispatch, connectSession)
  const loading = useSelector(selectUpdatePasswordLoading)

  const customerId = selectClientId(connectSession)
  const email = selectLoggedUserEmail(connectSession)
  const name = selectLoggedUserName(connectSession)
  const companyName = selectLoggedUserCompanyName(connectSession)
  const role = getCompanyRoles(connectSession?.loginIdentity)
  const isDesktopAdmin = selectIsAdmin(connectSession)

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
      <Section className={styles.userInfoSection}>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>NAME:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{name}</p>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>EMAIL ADDRESS:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{email}</p>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>COMPANY:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{companyName}</p>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>CUSTOMER ID:</SubTitleH6>
              </GridItem>
              <GridItem>
                <p>{customerId}</p>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Grid>
              <GridItem>
                <SubTitleH6>ROLE:</SubTitleH6>
              </GridItem>
              <GridItem>{role}</GridItem>
            </Grid>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
      </Section>
      {!connectIsDesktop && <ChangePasswordForm changePassword={changePassword} loading={loading} />}
      {isDesktopAdmin && <InstallationsTable />}
    </>
  )
}

export default Settings
