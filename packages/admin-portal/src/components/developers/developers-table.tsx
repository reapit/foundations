import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { DeveloperModel, DeveloperModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  PersistentNotification,
  Table,
  Subtitle,
  BodyText,
  ButtonGroup,
  elMb11,
  Button,
  useModal,
} from '@reapit/elements'
import { toLocalTime } from '@reapit/utils-common'
import { CreateSubscriptionsButton } from '../subscriptions/create-subscriptions'
import { MembersTable } from './members-table'
import DeveloperStatusModal from './developer-status-modal'

export interface DevelopersTableProps {
  developers: DeveloperModelPagedResult | null
  refreshDevelopers: () => void
}

export const handleOpenModal =
  (
    openModal: () => void,
    setDeveloperUpdate: Dispatch<SetStateAction<DeveloperModel | null>>,
    developer: DeveloperModel,
  ) =>
  () => {
    if (developer) {
      setDeveloperUpdate(developer)
      openModal()
    }
  }

export const handleDevIdMembers =
  (setDevIdMembers: Dispatch<SetStateAction<string | null>>, devIdMembers?: string) => () => {
    if (devIdMembers) {
      setDevIdMembers(devIdMembers)
    }
  }

export const DevelopersTable: FC<DevelopersTableProps> = ({ developers, refreshDevelopers }) => {
  const { Modal, openModal, closeModal } = useModal()
  const [developerUpdate, setDeveloperUpdate] = useState<DeveloperModel | null>(null)
  const [devIdMembers, setDevIdMembers] = useState<string | null>(null)

  return developers?.data?.length ? (
    <div className={elMb11}>
      <Subtitle>Total Apps</Subtitle>
      <BodyText hasGreyText>{developers.totalCount}</BodyText>
      <Table
        rows={developers.data.map((developer) => {
          const { company, name, id, jobTitle, status, agreedTerms } = developer
          return {
            cells: [
              {
                label: 'Company Name',
                value: company,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Developer Name',
                value: name,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Job Title',
                value: jobTitle,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Status',
                value: status,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Agreed Terms Date',
                value: agreedTerms ? toLocalTime(agreedTerms) : '-',
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <ButtonGroup alignment="center">
                    <Button
                      type="button"
                      intent="primary"
                      onClick={handleOpenModal(openModal, setDeveloperUpdate, developer)}
                    >
                      Update Status
                    </Button>
                    <CreateSubscriptionsButton developerId={id} subscriptionType="developerRegistration" />
                    <Button intent="secondary" onClick={handleDevIdMembers(setDevIdMembers, id)}>
                      Fetch Members
                    </Button>
                  </ButtonGroup>
                  {devIdMembers && devIdMembers === id && <MembersTable devIdMembers={devIdMembers} />}
                </>
              ),
            },
          }
        })}
      />
      <Modal title="Update Developer Status">
        <DeveloperStatusModal
          developer={developerUpdate}
          closeModal={closeModal}
          setDeveloperUpdate={setDeveloperUpdate}
          refreshDevelopers={refreshDevelopers}
        />
      </Modal>
    </div>
  ) : (
    <div className={elMb11}>
      <PersistentNotification isExpanded isFullWidth isInline intent="secondary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
