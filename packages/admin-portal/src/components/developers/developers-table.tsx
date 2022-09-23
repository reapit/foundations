import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { DeveloperModel, DeveloperModelPagedResult, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
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
import { toLocalTime, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { CreateSubscriptionsButton } from '../subscriptions/create-subscriptions'
import { MembersTable } from './members-table'
import DeveloperStatusModal from './developer-status-modal'
import { AppsTable } from './apps-table'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { usePermissionsState } from '../../core/use-permissions-state'

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
  (
    setDevIdMembers: Dispatch<SetStateAction<string | null>>,
    setDevIdApps: Dispatch<SetStateAction<string | null>>,
    devIdMembers?: string,
  ) =>
  () => {
    if (devIdMembers) {
      setDevIdMembers(devIdMembers)
      setDevIdApps(null)
    }
  }

export const handleDevIdApps =
  (
    setDevIdApps: Dispatch<SetStateAction<string | null>>,
    setDevIdMembers: Dispatch<SetStateAction<string | null>>,
    devIdApps?: string,
  ) =>
  () => {
    if (devIdApps) {
      setDevIdApps(devIdApps)
      setDevIdMembers(null)
    }
  }

export const handleToggleDevEdition =
  (
    developer: DeveloperModel,
    updateDeveloper: SendFunction<UpdateDeveloperModel, boolean>,
    refreshDevelopers: () => void,
    paysDeveloperEdition: boolean,
  ) =>
  async () => {
    const newValue = paysDeveloperEdition ? 0.0 : 300.0

    const response = await updateDeveloper(
      { ...developer, companyName: developer.company, developerEditionSubscriptionCost: newValue },
      { uriParams: { developerId: developer?.id } },
    )

    if (response) {
      refreshDevelopers()
    }
  }

export const DevelopersTable: FC<DevelopersTableProps> = ({ developers, refreshDevelopers }) => {
  const { Modal, openModal, closeModal } = useModal()
  const [developerUpdate, setDeveloperUpdate] = useState<DeveloperModel | null>(null)
  const [devIdMembers, setDevIdMembers] = useState<string | null>(null)
  const [devIdApps, setDevIdApps] = useState<string | null>(null)
  const { hasReadAccess } = usePermissionsState()

  const [, , updateDeveloper] = useReapitUpdate<UpdateDeveloperModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateDeveloper],
    method: 'PUT',
  })

  return developers?.data?.length ? (
    <div className={elMb11}>
      <Subtitle>Total Developers</Subtitle>
      <BodyText hasGreyText>{developers.totalCount}</BodyText>
      <Table
        rows={developers.data.map((developer) => {
          const { company, name, id, jobTitle, status, agreedTerms, developerEditionSubscriptionCost } = developer

          const paysDeveloperEdition = Boolean(
            developerEditionSubscriptionCost === null || Math.round(developerEditionSubscriptionCost ?? 0),
          )

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
                      disabled={hasReadAccess}
                      onClick={handleOpenModal(openModal, setDeveloperUpdate, developer)}
                    >
                      Update Status
                    </Button>
                    <Button
                      type="button"
                      intent="primary"
                      disabled={hasReadAccess}
                      onClick={handleToggleDevEdition(
                        developer,
                        updateDeveloper,
                        refreshDevelopers,
                        paysDeveloperEdition,
                      )}
                    >
                      {paysDeveloperEdition ? 'Pays For DevEdition' : 'DevEdition is Free'}
                    </Button>
                    <CreateSubscriptionsButton developerId={id} subscriptionType="developerRegistration" />
                    <Button intent="secondary" onClick={handleDevIdMembers(setDevIdMembers, setDevIdApps, id)}>
                      Fetch Members
                    </Button>
                    <Button intent="secondary" onClick={handleDevIdApps(setDevIdApps, setDevIdMembers, id)}>
                      Fetch Apps
                    </Button>
                  </ButtonGroup>
                  {devIdMembers && devIdMembers === id && <MembersTable devIdMembers={devIdMembers} />}
                  {devIdApps && devIdApps === id && <AppsTable devIdApps={devIdApps} />}
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
