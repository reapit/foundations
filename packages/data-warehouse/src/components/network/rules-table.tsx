import React, { FC } from 'react'
import { BodyText, Button, ButtonGroup, elMb11, elMb5, Icon, Loader, Table, useModal } from '@reapit/elements'
import { RulesModel } from '../../types/network'
import dayjs from 'dayjs'
import { RuleUpdateModal } from './rule-update-modal'
import { IpTable } from './ip-table'
import { IpCreateModal } from './ip-create-modal'
import { handleModalAction, useNetworkState } from './use-network-state'

export const RulesTable: FC = () => {
  const {
    Modal: ModalRule,
    openModal: openModalRule,
    closeModal: closeModalRule,
    modalIsOpen: modalIsOpenRule,
  } = useModal()
  const { Modal: ModalIp, openModal: openModalIp, closeModal: closeModalIp, modalIsOpen: modalIsOpenIp } = useModal()
  const { Modal: ModalBi, openModal: openModalBi, closeModal: closeModalBi, modalIsOpen: modalIsOpenBi } = useModal()

  const { rules, ips, ipsLoading, setNetworkSelected, customerId } = useNetworkState()

  return (
    <>
      <Table
        className={elMb11}
        rows={rules?._embedded?.map((rule: RulesModel) => {
          const { name, enabled, created, modified, id } = rule
          return {
            cells: [
              {
                label: 'Network Rule Name',
                value: name,
                icon: 'contact',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Enabled',
                value: enabled ? <Icon icon="check" intent="success" /> : <Icon icon="close" intent="danger" />,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Created',
                value: created ? dayjs(created).format('DD/MM/YYYY') : 'Unknown',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Modified',
                value: modified ? dayjs(modified).format('DD/MM/YYYY') : 'Unknown',
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <ButtonGroup className={elMb5} alignment="right">
                    <Button intent="primary" onClick={openModalBi} disabled={modalIsOpenBi}>
                      I Use PowerBI
                    </Button>
                    <Button
                      intent="primary"
                      onClick={handleModalAction(setNetworkSelected, openModalIp, 'ipRuleId', id)}
                      disabled={modalIsOpenIp}
                    >
                      Create Whitelisted IP
                    </Button>
                    <Button
                      intent="primary"
                      onClick={handleModalAction(setNetworkSelected, openModalRule, 'ruleId', id)}
                      disabled={modalIsOpenRule}
                    >
                      Update Rule
                    </Button>
                  </ButtonGroup>
                  {ipsLoading ? <Loader /> : ips && id && <IpTable />}
                </>
              ),
            },
          }
        })}
      />
      <ModalRule title="Network Rule Edit">
        <RuleUpdateModal closeModal={closeModalRule} />
      </ModalRule>
      <ModalIp title="Create Whitelisted IP">
        <IpCreateModal closeModal={closeModalIp} />
      </ModalIp>
      <ModalBi title="Power BI Users">
        <BodyText hasSectionMargin>
          If you use PowerBI to access the Data Warehouse, there are around 200 IPs that could potentially be
          whitelisted. To avoid having to do this manually, just send us an email with the pre-filled subject line by
          clicking the button below. One of our team will action the request as soon as possible and get back to you.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="default" type="button" onClick={closeModalBi}>
            Close
          </Button>
          <a
            href={`mailto:dwh@reapitfoundations.zendesk.com?subject='Data%20Warehouse%20PowerBI%20Setup%20Request%20For%20CustomerId%20${customerId}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button intent="primary">Open Mail Client</Button>
          </a>
        </ButtonGroup>
      </ModalBi>
    </>
  )
}

export default RulesTable
