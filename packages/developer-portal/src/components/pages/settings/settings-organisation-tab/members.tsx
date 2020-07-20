import React from 'react'
import { FlexContainerBasic, Table, Section, H5, Loader } from '@reapit/elements'
import SetAsAdminModal from '@/components/pages/settings/set-as-admin-modal'
import SetMemberStatusModal from '@/components/ui/organisation-set-member-status-modal'
import styles from '@/styles/elements/link.scss?mod'
import { useSelector } from 'react-redux'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'

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
    id: 'status',
  },
  {
    accessor: 'action',
    columnProps: {
      style: { minWidth: '105px' },
    },
  },
]

export const prepareData = (data, handleOpenSetAdminModal, setSelectedUser, setEditStatusModalVisible) => {
  return data.map(user => ({
    ...user,
    action: (
      <FlexContainerBasic centerContent flexColumn>
        <a
          className={styles.hyperlinked}
          onClick={openSetMemberStatusModal(setSelectedUser, setEditStatusModalVisible, user)}
        >
          {user.isInactive ? 'Enable' : 'Disable'}
        </a>
        <a
          data-test="button-cancel"
          className={styles.hyperlinked}
          onClick={() => {
            setSelectedUser(user)
            handleOpenSetAdminModal()
          }}
        >
          Set as Admin
        </a>
      </FlexContainerBasic>
    ),
  }))
}

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () => {
  setModalOpen(isVisible)
}

export const closeSetMemberStatusModal = (
  setEditStatusModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  setEditStatusModalVisible(false)
}

export const openSetMemberStatusModal = (setSelectedUser, setEditStatusModalVisible, user) => () => {
  setSelectedUser(user)
  setEditStatusModalVisible(true)
}

export const Members: React.FC = () => {
  const [isSetAdminModalOpen, setIsSetAdminModalOpen] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<any>(null)
  const [editStatusModalVisible, setEditStatusModalVisible] = React.useState<boolean>(false)

  const handleOpenSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, true)
  const handleCloseSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, false)

  const loading = useSelector(selectOrganisationMembersLoading)
  const members = useSelector(selectOrganisationMembers)

  const data = prepareData(members, handleOpenSetAdminModal, setSelectedUser, setEditStatusModalVisible)

  return (
    <Section>
      <H5>Members</H5>
      {loading ? <Loader /> : <Table scrollable loading={loading} data={data} columns={columns} />}

      <SetMemberStatusModal
        visible={editStatusModalVisible}
        developer={selectedUser}
        onCancel={closeSetMemberStatusModal(setEditStatusModalVisible)}
        onSuccess={closeSetMemberStatusModal(setEditStatusModalVisible)}
      />
      <SetAsAdminModal
        visible={isSetAdminModalOpen}
        afterClose={handleCloseSetAdminModal}
        username={selectedUser?.name}
      />
    </Section>
  )
}
