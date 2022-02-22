import React, { FC, useState, MouseEvent } from 'react'
import { Title, Subtitle, BodyText, Button, FlexContainer, ButtonGroup, elMb12 } from '@reapit/elements'
import Routes from '../../../constants/routes'
import { KeyAnimation, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import reapitLogo from '../../../assets/images/reapit-logo.svg'
import { LoginContainer, LoginImageContainer, LoginContentWrapper } from '../login/__styles__'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { selectDeveloperId, selectIsCustomer, selectIsUserAdmin } from '../../../selector/auth'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { openNewPage } from '../../../utils/navigation'
import { CustomerModel } from '@reapit/foundations-ts-definitions'

export const onLoginButtonClick = () => (event: MouseEvent) => {
  event.preventDefault()
  reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
}

export interface UpdateCustomerModel {
  accountApprovedEmail: string
  accountApproved: string
}

export const CustomerRegister: FC = () => {
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const orgName = connectSession?.loginIdentity.orgName ?? ''
  const hasDeveloperOrg = Boolean(selectDeveloperId(connectSession))
  const isCustomerAdmin = selectIsUserAdmin(connectSession)
  const isCustomer = selectIsCustomer(connectSession)

  const [customer] = useReapitGet<CustomerModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getCustomersById],
    uriParams: {
      customerId: connectSession?.loginIdentity.clientId,
    },
    fetchWhenTrue: [isCustomerAdmin, !hasDeveloperOrg, connectSession?.loginIdentity.clientId],
  })

  console.log(customer)

  const [updatingCustomer, , , updateCustomerSuccess] = useReapitUpdate<UpdateCustomerModel, UpdateCustomerModel>({
    method: 'PUT',
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateCustomer],
    uriParams: {
      customerId: connectSession?.loginIdentity.clientId,
    },
  })

  console.log(updatingCustomer, updateCustomerSuccess)

  return (
    <LoginContainer>
      <LoginImageContainer>
        <KeyAnimation step={keyStep} />
      </LoginImageContainer>
      <LoginContentWrapper>
        <img src={reapitLogo} alt="Reapit Connect Graphic" />
        <FlexContainer isFlexColumn>
          <Title hasNoMargin hasCenteredText>
            Welcome
          </Title>
          <Subtitle hasCenteredText hasSectionMargin>
            to the Reapit Foundations Developer Portal
          </Subtitle>
        </FlexContainer>
        {hasDeveloperOrg && (
          <>
            <BodyText hasGreyText>
              The organisation ‘{orgName}’ has already been setup within the Developer Portal. To access this
              organisation, you will need to be invited by the Admin who set the account up.
            </BodyText>
            <BodyText hasGreyText hasSectionMargin>
              An admin can invite you from{' '}
              <a href={`${window.location.origin}${Routes.SETTINGS_ORGANISATION_TAB}`} target="_blank" rel="noreferrer">
                this page
              </a>
              . You will need to contact them directly to request access.
            </BodyText>
          </>
        )}
        {isCustomer && !isCustomerAdmin && !hasDeveloperOrg && (
          <>
            <BodyText hasGreyText>
              Unfortunately, only an Admin can setup your developer organisation ‘{orgName}’. Please contact an Admin to
              set up the account.
            </BodyText>
            <BodyText hasGreyText hasSectionMargin>
              They can do this up from{' '}
              <a href={`${window.location.origin}${Routes.SELECT_ROLE}`} target="_blank" rel="noreferrer">
                this page
              </a>
              . You will need to contact them directly to perform this task.
            </BodyText>
          </>
        )}
        {isCustomerAdmin && !hasDeveloperOrg && (
          <>
            <BodyText hasGreyText>
              Unfortunately, only an Admin can setup your developer organisation ‘{orgName}’. Please contact an Admin to
              setup the account. They can set this up from{' '}
              <a href={`${window.location.origin}${Routes.SELECT_ROLE}`} target="_blank" rel="noreferrer">
                {window.location.origin}
                {Routes.SELECT_ROLE}
              </a>
            </BodyText>
            <BodyText hasGreyText hasSectionMargin>
              You will need to contact them directly to perform this task.
            </BodyText>
          </>
        )}
        <ButtonGroup
          onMouseOver={() => {
            setKeyStep(3)
          }}
          onMouseOut={() => {
            setKeyStep(1)
          }}
          alignment="center"
          className={elMb12}
        >
          <Button onClick={openNewPage(window.reapit.config.marketplaceUrl)} intent="primary" size={3}>
            Visit AppMarket
          </Button>
        </ButtonGroup>
        <BodyText hasGreyText hasCenteredText>
          {process.env.APP_VERSION}
        </BodyText>
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default CustomerRegister
