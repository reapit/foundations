import React, { FC, useState, MouseEvent } from 'react'
import { Title, Subtitle, BodyText, Button, FlexContainer, ButtonGroup, elMb12 } from '@reapit/elements'
import Routes from '../../../constants/routes'
import { KeyAnimation, SendFunction, useReapitUpdate } from '@reapit/utils-react'
import reapitLogo from '../../../assets/images/reapit-logo.svg'
import { LoginContainer, LoginImageContainer, LoginContentWrapper } from '../login/__styles__'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { selectDeveloperId, selectIsCustomer, selectIsUserAdmin } from '../../../selector/auth'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { openNewPage } from '../../../utils/navigation'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import TermsAndConditionsModal from '../../ui/terms-and-conditions-modal'
import dayjs from 'dayjs'

export const onLoginButtonClick = () => (event: MouseEvent) => {
  event.preventDefault()
  reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
}

export interface UpdateCustomerModel {
  accountApprovedEmail: string
  accountApproved: string
}

export const handleCreateAccount =
  (
    updateCustomer: SendFunction<UpdateCustomerModel, boolean | null>,
    createDeveloper: SendFunction<CreateDeveloperModel, boolean | null>,
    connectSession: ReapitConnectSession | null,
  ) =>
  () => {
    const registerCustomer = async () => {
      if (!connectSession) return

      const { loginIdentity } = connectSession

      const customer = await updateCustomer({
        accountApprovedEmail: loginIdentity.email ?? '',
        accountApproved: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
      })

      if (!customer) return

      const developer = await createDeveloper({
        name: loginIdentity.name ?? '',
        companyName: loginIdentity.orgName ?? '',
        email: loginIdentity.email ?? '',
        agreedTerms: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
      })

      if (developer) {
        window.location.href = `${window.reapit.config.connectOAuthUrl}/authorize?response_type=code&client_id=${window.reapit.config.connectClientId}&redirect_uri=${window.location.origin}${Routes.APPS}&state=${Routes.SETTINGS_ORGANISATION_TAB}`
      }
    }
    registerCustomer()
  }

export const CustomerRegister: FC = () => {
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)
  const [termsModalVisible, setTermsModalVisible] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const orgName = connectSession?.loginIdentity.orgName ?? ''
  const hasDeveloperOrg = Boolean(selectDeveloperId(connectSession))
  const isCustomerAdmin = selectIsUserAdmin(connectSession)
  const isCustomer = selectIsCustomer(connectSession)

  const [updatingCustomer, , updateCustomer] = useReapitUpdate<UpdateCustomerModel, null>({
    method: 'PUT',
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateCustomer],
    uriParams: {
      customerId: connectSession?.loginIdentity.orgId,
    },
  })

  const [creatingDeveloper, , createDeveloper] = useReapitUpdate<CreateDeveloperModel, null>({
    method: 'POST',
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createDeveloper],
  })

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
            <BodyText hasGreyText hasCenteredText>
              The organisation ‘{orgName}’ has already been setup within the Developer Portal. To access this
              organisation, you will need to be invited by the Admin who set the account up.
            </BodyText>
            <BodyText hasGreyText hasCenteredText>
              An admin can invite you from{' '}
              <a href={`${window.location.origin}${Routes.SETTINGS_ORGANISATION_TAB}`} target="_blank" rel="noreferrer">
                this page
              </a>
              .
            </BodyText>
            <BodyText hasGreyText hasCenteredText hasSectionMargin>
              You will need to contact them directly to request access.
            </BodyText>
          </>
        )}
        {isCustomer && !isCustomerAdmin && !hasDeveloperOrg && (
          <>
            <BodyText hasGreyText hasCenteredText>
              Unfortunately, only an Admin can setup your developer organisation ‘{orgName}’. Please contact an Admin to
              set up the account.
            </BodyText>
            <BodyText hasGreyText hasCenteredText>
              They can do this up from{' '}
              <a href={`${window.location.origin}${Routes.SELECT_ROLE}`} target="_blank" rel="noreferrer">
                this page
              </a>
              .
            </BodyText>
            <BodyText hasGreyText hasCenteredText hasSectionMargin>
              You will need to contact them directly to perform this task.
            </BodyText>
          </>
        )}
        {isCustomerAdmin && !hasDeveloperOrg && (
          <>
            <BodyText hasGreyText hasCenteredText>
              This portal is used for building apps and integrations on top of our Platform APIs.
            </BodyText>
            <BodyText hasGreyText hasCenteredText>
              Whilst using the Developer Portal to build against our Sandbox environment is free, API consumption
              charges apply when your app or integration is published (either privately or publicly) in the AppMarket.
            </BodyText>
            <BodyText hasGreyText hasCenteredText hasSectionMargin>
              To view our Terms and Conditions, please click ‘Proceed’ below.
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
          {isCustomerAdmin && !hasDeveloperOrg && (
            <Button onClick={() => setTermsModalVisible(true)} intent="critical" size={3}>
              Proceed
            </Button>
          )}
        </ButtonGroup>
        <TermsAndConditionsModal
          visible={termsModalVisible}
          afterClose={() => setTermsModalVisible(false)}
          onAccept={handleCreateAccount(updateCustomer, createDeveloper, connectSession)}
          onDecline={() => setTermsModalVisible(false)}
          isSubmitting={creatingDeveloper || updatingCustomer}
        />
        <BodyText hasGreyText hasCenteredText>
          {process.env.APP_VERSION}
        </BodyText>
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default CustomerRegister
