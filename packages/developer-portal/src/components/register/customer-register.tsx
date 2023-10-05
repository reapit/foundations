import React, { FC, useState, Dispatch, SetStateAction } from 'react'
import { Subtitle, BodyText, Button, FlexContainer, ButtonGroup, Icon, elMb7 } from '@reapit/elements'
import Routes from '../../constants/routes'
import { LoginContainer, LoginContentWrapper } from '../login/__styles__'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { selectDeveloperId, selectIsCustomer, selectIsUserAdmin } from '../../utils/auth'
import { UpdateActionNames, updateActions, SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { ExternalPages, openNewPage } from '../../utils/navigation'
import { CreateDeveloperModel, UpdateCustomerModel } from '@reapit/foundations-ts-definitions'
import TermsAndConditionsModal from './terms-and-conditions-modal'
import dayjs from 'dayjs'

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
        window.location.href = `${process.env.connectOAuthUrl}/authorize?response_type=code&client_id=${process.env.connectClientId}&redirect_uri=${window.location.origin}${Routes.APPS}&state=${Routes.SETTINGS_COMPANY}`
      }
    }
    registerCustomer().catch((error) => console.error(error))
  }

export const handleSetModal =
  (termsModalVisible: boolean, setTermsModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
    setTermsModalVisible(termsModalVisible)
  }

export const CustomerRegister: FC = () => {
  const [termsModalVisible, setTermsModalVisible] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const orgName = connectSession?.loginIdentity.orgName ?? ''
  const hasDeveloperOrg = Boolean(selectDeveloperId(connectSession))
  const isCustomerAdmin = selectIsUserAdmin(connectSession)
  const isCustomer = selectIsCustomer(connectSession)

  const [updatingCustomer, , updateCustomer] = useReapitUpdate<UpdateCustomerModel, null>({
    method: 'PUT',
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateCustomer],
    uriParams: {
      customerId: connectSession?.loginIdentity.orgId,
    },
  })

  const [creatingDeveloper, , createDeveloper] = useReapitUpdate<CreateDeveloperModel, null>({
    method: 'POST',
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createDeveloper],
  })

  return (
    <LoginContainer>
      <LoginContentWrapper>
        <Icon className={elMb7} height="40px" width="200px" icon="reapitLogoInfographic" />
        <FlexContainer isFlexColumn>
          <Subtitle hasNoMargin hasCenteredText>
            Welcome
          </Subtitle>
          <BodyText hasCenteredText hasSectionMargin>
            to the Reapit Foundations Developer Portal
          </BodyText>
        </FlexContainer>
        {hasDeveloperOrg && (
          <>
            <BodyText hasGreyText hasCenteredText>
              The organisation ‘{orgName}’ has already been setup within the Developer Portal. To access this
              organisation, you will need to be invited by the Admin who set the account up.
            </BodyText>
            <BodyText hasGreyText hasCenteredText hasSectionMargin>
              For more information on how an Admin can Invite Members to an organisation, please{' '}
              <a onClick={openNewPage(ExternalPages.inviteMembersDocs)} target="_blank" rel="noreferrer">
                click here
              </a>
              .
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
        <ButtonGroup alignment="center">
          <Button onClick={openNewPage(process.env.marketplaceUrl)} intent="default">
            Visit AppMarket
          </Button>
          {isCustomerAdmin && !hasDeveloperOrg && (
            <Button onClick={handleSetModal(true, setTermsModalVisible)} intent="primary">
              Proceed
            </Button>
          )}
        </ButtonGroup>
        <TermsAndConditionsModal
          visible={termsModalVisible}
          onAccept={handleCreateAccount(updateCustomer, createDeveloper, connectSession)}
          onDecline={handleSetModal(false, setTermsModalVisible)}
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
