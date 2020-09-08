import React, { Dispatch } from 'react'
import { FlexContainerBasic, Table, Section, H5 } from '@reapit/elements'
import SetAsAdminModal from './set-as-admin'
import DisableMemberModal from '@/components/ui/disable-member-modal'
import { hyperlinked } from '@/styles/elements/link'
import { useSelector } from 'react-redux'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'
import InviteMemberModal from '@/components/ui/developer-invite-member-modal'
import { selectCurrentMemberData } from '@/selector/current-member'

export const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Job Title',
    accessor: 'jobTitle',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'User Account',
    accessor: 'role',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    accessor: 'action',
    columnProps: {
      style: { minWidth: '120px' },
    },
  },
]

export const prepareData = (
  data,
  currentUserId,
  handleOpenSetAdminModal,
  setSelectedUser,
  setEditStatusModalVisible,
  setReInviteModalVisible,
) => {
  return data.map(user => {
    const ableToSetAdmin = user.role === 'user' && user.status === 'active'
    const ableToReInvite = ['inactive', 'rejected', 'pending'].includes(user.status)
    const ableToDisable = user.status === 'active'
    return {
      ...user,
      action:
        currentUserId !== user.id ? (
          <FlexContainerBasic centerContent flexColumn>
            {ableToDisable && (
              <a
                className={hyperlinked}
                onClick={openDisableMemberModal(setSelectedUser, setEditStatusModalVisible, user)}
              >
                Disable
              </a>
            )}
            {ableToReInvite && (
              <a className={hyperlinked} onClick={openReinviteModal(setSelectedUser, setReInviteModalVisible, user)}>
                Invite Again
              </a>
            )}
            {ableToSetAdmin && (
              <a
                data-test="button-cancel"
                className={hyperlinked}
                onClick={() => {
                  setSelectedUser(user)
                  handleOpenSetAdminModal()
                }}
              >
                Set as Admin
              </a>
            )}
          </FlexContainerBasic>
        ) : null,
    }
  })
}

export const openReinviteModal = (setSelectedUser: Dispatch<any>, setModalOpen: Dispatch<boolean>, user) => () => {
  setModalOpen(true)
  setSelectedUser(user)
}

export const closeReinviteModal = (setModalOpen: Dispatch<boolean>) => () => {
  setModalOpen(false)
}

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () => {
  setModalOpen(isVisible)
}

export const closeDisableMemberModal = (
  setDisableMemberModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  setDisableMemberModalVisible(false)
}

export const openDisableMemberModal = (setSelectedUser, setDisableMemberModalVisible, user) => () => {
  setSelectedUser(user)
  setDisableMemberModalVisible(true)
}

export const Members: React.FC = () => {
  const [isSetAdminModalOpen, setIsSetAdminModalOpen] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<any>(null)
  const [disableMemberModalVisible, setDisableMemberModalVisible] = React.useState<boolean>(false)
  const [reInviteModalVisible, setReInviteModalVisible] = React.useState<boolean>(false)

  const handleOpenSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, true)
  const handleCloseSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, false)

  const currentUser = useSelector(selectCurrentMemberData)
  const currentUserId = currentUser.id

  const loading = useSelector(selectOrganisationMembersLoading)
  const members = useSelector(selectOrganisationMembers)

  const data = prepareData(
    members,
    currentUserId,
    handleOpenSetAdminModal,
    setSelectedUser,
    setDisableMemberModalVisible,
    setReInviteModalVisible,
  )
  return (
    <Section>
      <H5>Members</H5>
      <Table scrollable loading={loading} data={data} columns={columns} />
      <DisableMemberModal
        visible={disableMemberModalVisible}
        developer={selectedUser}
        onCancel={closeDisableMemberModal(setDisableMemberModalVisible)}
        onSuccess={closeDisableMemberModal(setDisableMemberModalVisible)}
      />
      <SetAsAdminModal visible={isSetAdminModalOpen} onClose={handleCloseSetAdminModal} user={selectedUser} />
      <InviteMemberModal
        developerId={currentUser.developerId as string}
        visible={reInviteModalVisible}
        onClose={closeReinviteModal(setReInviteModalVisible)}
        memberData={selectedUser}
      />
    </Section>
  )
}
