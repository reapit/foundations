import React, { useState, FC } from 'react'
import AccountsTable from './accounts-table'
import { AccountProvisionModal } from './account-provision-modal'
import AccountProgressBar from './account-progress-bar'
import { useGlobalState } from '../../core/use-global-state'
import {
  BodyText,
  Button,
  elMb5,
  FlexContainer,
  PageContainer,
  PersistentNotification,
  SecondaryNavContainer,
  SmallText,
  Subtitle,
  Title,
  useModal,
} from '@reapit/elements'
import { openNewPage } from '../nav'

export const Accounts: FC = () => {
  const { accounts } = useGlobalState()
  const { Modal, openModal, closeModal } = useModal()
  const [provisionInProgress, setProvisionInProgress] = useState<boolean>(false)
  const [percentageComplete, setPercentageComplete] = useState(0)

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <BodyText>Support</BodyText>
        <SmallText tag="p" hasGreyText>
          Your first step is to provision a user account for the solution using the button below.
        </SmallText>
        <SmallText tag="p" hasSectionMargin hasGreyText>
          Please see also below for more resources and assistance.
        </SmallText>
        <Button
          className={elMb5}
          intent="primary"
          onClick={openModal}
          loading={provisionInProgress && percentageComplete < 100}
          disabled={provisionInProgress && percentageComplete < 100}
        >
          Provision User
        </Button>
        <Button
          className={elMb5}
          intent="neutral"
          onClick={openNewPage('https://datawarehouse-foundations.reapit.cloud/')}
        >
          View Docs
        </Button>
        <div>
          <Button
            className={elMb5}
            intent="neutral"
            onClick={openNewPage('https://www.youtube.com/watch?v=dX9xhOENd7U')}
          >
            Video
          </Button>
        </div>
        <Button className={elMb5} intent="neutral" onClick={openNewPage('mailto:dwh@reapitfoundations.zendesk.com')}>
          Help
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <Title>User Accounts</Title>
        <Modal title="Provision Data Warehouse Account">
          <AccountProvisionModal
            closeModal={closeModal}
            setProvisionInProgress={setProvisionInProgress}
            setPercentageComplete={setPercentageComplete}
          />
        </Modal>
        {provisionInProgress && (
          <AccountProgressBar percentageComplete={percentageComplete} setPercentageComplete={setPercentageComplete} />
        )}
        <BodyText hasGreyText>
          In order to access your organisations data warehouse, you must first create the user accounts to access it.
          You are to manage and create as many user accounts as you wish without any additional costs. We recommend that
          each individual user or application is provided with a unique set of credentials.
        </BodyText>
        <BodyText hasGreyText>
          Please note that creating the first user account is a long running process and can take several minutes to
          complete.
        </BodyText>
        <Subtitle>User Account Details</Subtitle>
        {accounts?._embedded?.length ? (
          <AccountsTable />
        ) : (
          <PersistentNotification isInline isExpanded isFullWidth intent="primary">
            No accounts yet provisioned for your organisation
          </PersistentNotification>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default Accounts
