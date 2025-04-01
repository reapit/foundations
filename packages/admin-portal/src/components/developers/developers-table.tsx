import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
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
import { CreateSubscriptions } from '../subscriptions/create-subscriptions'
import { MembersTable } from './members-table'
import DeveloperStatusModal from './developer-status-modal'
import { AppsTable } from './apps-table'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { usePermissionsState } from '../../core/use-permissions-state'
import { InviteMemberModalForm } from './invite-member-modal-form'

export interface DevelopersTableProps {
  developers: Marketplace.DeveloperModelPagedResult | null
  refreshDevelopers: () => void
}

export const handleOpenModal =
  (
    openModal: () => void,
    setDeveloperUpdate: Dispatch<SetStateAction<Marketplace.DeveloperModel | null>>,
    developer: Marketplace.DeveloperModel,
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
    setDevIdSubs: Dispatch<SetStateAction<string | null>>,
    setDevIdApps: Dispatch<SetStateAction<string | null>>,
    devIdMembers?: string,
  ) =>
  () => {
    if (devIdMembers) {
      setDevIdMembers(devIdMembers)
      setDevIdSubs(null)
      setDevIdApps(null)
    }
  }

export const handleDevIdApps =
  (
    setDevIdApps: Dispatch<SetStateAction<string | null>>,
    setDevIdSubs: Dispatch<SetStateAction<string | null>>,
    setDevIdMembers: Dispatch<SetStateAction<string | null>>,
    devIdApps?: string,
  ) =>
  () => {
    if (devIdApps) {
      setDevIdApps(devIdApps)
      setDevIdSubs(null)
      setDevIdMembers(null)
    }
  }

export const handleDevIdSubs =
  (
    setDevIdSubs: Dispatch<SetStateAction<string | null>>,
    setDevIdApps: Dispatch<SetStateAction<string | null>>,
    setDevIdMembers: Dispatch<SetStateAction<string | null>>,
    devIdSubs?: string,
  ) =>
  () => {
    if (devIdSubs) {
      setDevIdSubs(devIdSubs)
      setDevIdApps(null)
      setDevIdMembers(null)
    }
  }

export const handleDevIdDelete =
  (setDevIdDelete: Dispatch<SetStateAction<string | null>>, openDeleteConfirmModal: () => void, devIdDelete?: string) =>
  () => {
    if (devIdDelete) {
      setDevIdDelete(devIdDelete)
      openDeleteConfirmModal()
    }
  }

export const handleDeleteDev =
  (
    setDevIdDelete: Dispatch<SetStateAction<string | null>>,
    closeDeleteConfirmModal: () => void,
    deleteDeveloper: SendFunction<void, boolean>,
    refreshDevelopers: () => void,
  ) =>
  async () => {
    const deleted = await deleteDeveloper()

    if (deleted) {
      closeDeleteConfirmModal()
      setDevIdDelete(null)
      refreshDevelopers()
    }
  }

export const handleToggleDevEdition =
  (
    developer: Marketplace.DeveloperModel,
    updateDeveloper: SendFunction<Marketplace.UpdateDeveloperModel, boolean>,
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

export const handleDevIdInvite =
  (
    setDevIdInvite: Dispatch<SetStateAction<string | null>>,
    setDevIdMembers: Dispatch<SetStateAction<string | null>>,
    openInviteMemberModal: () => void,
    devIdInvite?: string,
  ) =>
  () => {
    if (devIdInvite) {
      setDevIdMembers(null)
      setDevIdInvite(devIdInvite)
      openInviteMemberModal()
    }
  }

export const DevelopersTable: FC<DevelopersTableProps> = ({ developers, refreshDevelopers }) => {
  const { Modal, openModal, closeModal } = useModal()
  const {
    Modal: DeleteConfirmModal,
    openModal: openDeleteConfirmModal,
    closeModal: closeDeleteConfirmModal,
  } = useModal()
  const { Modal: InviteMemberModal, openModal: openInviteMemberModal, closeModal: closeInviteMemberModal } = useModal()
  const [developerUpdate, setDeveloperUpdate] = useState<Marketplace.DeveloperModel | null>(null)
  const [devIdMembers, setDevIdMembers] = useState<string | null>(null)
  const [devIdApps, setDevIdApps] = useState<string | null>(null)
  const [devIdSubs, setDevIdSubs] = useState<string | null>(null)
  const [devIdDelete, setDevIdDelete] = useState<string | null>(null)
  const [devIdInvite, setDevIdInvite] = useState<string | null>(null)
  const { hasReadAccess } = usePermissionsState()

  const [, , updateDeveloper] = useReapitUpdate<Marketplace.UpdateDeveloperModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateDeveloper],
    method: 'PUT',
  })

  const [, , deleteDeveloper] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteDeveloper],
    method: 'DELETE',
    uriParams: { developerId: devIdDelete },
  })

  return developers?.data?.length ? (
    <div className={elMb11}>
      <Subtitle>Total Developers</Subtitle>
      <BodyText hasGreyText>{developers.totalCount}</BodyText>
      <Table
        rows={developers.data.map((developer) => {
          const { company, name, id, jobTitle, status, email, agreedTerms, created, developerEditionSubscriptionCost } =
            developer

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
                label: 'Developer Email',
                value: email,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Job Title',
                value: jobTitle,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Account Status',
                value: status,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Created Date',
                value: toLocalTime(created),
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
                    <Button
                      onClick={handleDevIdSubs(setDevIdSubs, setDevIdApps, setDevIdMembers, id)}
                      intent="primary"
                      disabled={hasReadAccess || status !== 'confirmed'}
                    >
                      Toggle Subscription {status !== 'confirmed' ? '(Status Not Confirmed)' : ''}
                    </Button>
                    <Button
                      onClick={handleDevIdInvite(setDevIdInvite, setDevIdMembers, openInviteMemberModal, id)}
                      intent="primary"
                      disabled={hasReadAccess}
                    >
                      Invite Member
                    </Button>
                    <Button
                      intent="primary"
                      onClick={handleDevIdMembers(setDevIdMembers, setDevIdSubs, setDevIdApps, id)}
                    >
                      Fetch Members
                    </Button>
                    <Button intent="primary" onClick={handleDevIdApps(setDevIdApps, setDevIdSubs, setDevIdMembers, id)}>
                      Fetch Apps
                    </Button>
                    <Button
                      type="button"
                      intent="danger"
                      disabled={hasReadAccess}
                      onClick={handleDevIdDelete(setDevIdDelete, openDeleteConfirmModal, id)}
                    >
                      Delete Developer
                    </Button>
                  </ButtonGroup>
                  {devIdMembers && devIdMembers === id && <MembersTable devIdMembers={devIdMembers} />}
                  {devIdApps && devIdApps === id && <AppsTable devIdApps={devIdApps} />}
                  {devIdSubs && devIdSubs === id && (
                    <CreateSubscriptions developerId={id} subscriptionType="developerRegistration" />
                  )}
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
      <DeleteConfirmModal title="Delete Developer">
        <BodyText hasGreyText>Are you sure you want to delete this developer? This action cannot be undone.</BodyText>
        <ButtonGroup alignment="right">
          <Button onClick={closeDeleteConfirmModal}>Cancel</Button>
          <Button
            intent="danger"
            onClick={handleDeleteDev(setDevIdDelete, closeDeleteConfirmModal, deleteDeveloper, refreshDevelopers)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </DeleteConfirmModal>
      <InviteMemberModal title="Invite Developer Org Member">
        {devIdInvite && <InviteMemberModalForm developerId={devIdInvite} closeModal={closeInviteMemberModal} />}
      </InviteMemberModal>
    </div>
  ) : (
    <div className={elMb11}>
      <PersistentNotification isExpanded isFullWidth isInline intent="primary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
