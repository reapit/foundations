import React, { FC } from 'react'
import RulesTable from './rules-table'
import { RuleCreateModal } from './rule-create-modal'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb5,
  FlexContainer,
  Loader,
  PageContainer,
  PersistentNotification,
  SecondaryNavContainer,
  SmallText,
  Subtitle,
  Title,
  useModal,
} from '@reapit/elements'
import { openNewPage } from '../nav'
import { useNetworkState } from './use-network-state'

export const Network: FC = () => {
  const { Modal, openModal, closeModal } = useModal()
  const { Modal: ModalBi, openModal: openModalBi, closeModal: closeModalBi, modalIsOpen: modalIsOpenBi } = useModal()
  const { customerId, rulesLoading, rules, customersLoading, organisationId, organisationName } = useNetworkState()

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <BodyText>Network</BodyText>
        <SmallText tag="p" hasGreyText>
          To create a whitelisted IP address for your organisation, first click the button below.
        </SmallText>
        <SmallText tag="p" hasSectionMargin hasGreyText>
          Please see also below for more resources and assistance.
        </SmallText>
        <Button className={elMb5} intent="primary" onClick={openModal}>
          New Network Rule
        </Button>
        <Button className={elMb5} intent="primary" onClick={openModalBi} disabled={modalIsOpenBi}>
          I Use PowerBI
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
        <Title>IP Whitelisting</Title>
        <Modal title="Create Network Rule">{customerId && <RuleCreateModal closeModal={closeModal} />}</Modal>
        <ModalBi title="Power BI Users">
          <BodyText>
            If you use PowerBI to access the Data Warehouse, there are around 200 IPs that could potentially be
            whitelisted.
          </BodyText>
          <BodyText hasSectionMargin>
            To avoid having to do this manually, just send us an email with the pre-filled subject line by clicking the
            button below. One of our team will action the request as soon as possible and get back to you.
          </BodyText>
          <ButtonGroup alignment="right">
            <Button intent="default" type="button" onClick={closeModalBi}>
              Close
            </Button>
            <a
              href={`mailto:dwh@reapitfoundations.zendesk.com?subject=Data%20Warehouse%20PowerBI%20setup%20request%20for%20${organisationName} (${organisationId})`}
              target="_blank"
              rel="noreferrer"
            >
              <Button intent="primary">Open Mail Client</Button>
            </a>
          </ButtonGroup>
        </ModalBi>
        <BodyText hasGreyText>
          By default, any external access to your Snowflake account is prohibited. You are required to setup IP policies
          to ensure access is only granted to addresses you trust. First, setup a network rule specific to a trusted
          location, and then assign that location&apos;s IP addresses to it, before finally enabling the rule on your
          account. Whilst you can add all IP addresses to one rule, it is recommended to use multiple rules to separate
          concerns. For example, you may choose to have one rule for your corporate network, and another rule for home
          office users. This can make management of your rules easier.
        </BodyText>
        <BodyText hasGreyText hasSectionMargin>
          For advanced users, it is possible to configure IP address ranges by providing the appropriate CIDR range when
          configuring the IP addresses against each rule. Depending on your network this may make it easier to maintain
          your account configuration.
        </BodyText>
        <Subtitle>Network Rules</Subtitle>

        {rulesLoading || customersLoading ? (
          <Loader />
        ) : rules?._embedded?.length && customerId ? (
          <RulesTable />
        ) : (
          <PersistentNotification isInline isExpanded isFullWidth intent="primary">
            No network rules yet configured for your organisation
          </PersistentNotification>
        )}
      </PageContainer>
    </FlexContainer>
  )
}
