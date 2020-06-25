import React from 'react'
import { H3, FlexContainerResponsive, Content, FlexContainerBasic, Table } from '@reapit/elements'
import SetAsAdminModal from '@/components/ui/developer-settings/set-as-admin-modal'
import styles from '@/styles/elements/link.scss?mod'

interface CellNameProps {
  row: {
    original: {
      email: string
      title: string
    }
  }
}

export const CellName: React.FC<CellNameProps> = ({
  row: {
    original: { email, title },
  },
}) => {
  return (
    <FlexContainerBasic flexColumn centerContent>
      <div>{email}</div>
      <div>{title}</div>
    </FlexContainerBasic>
  )
}

export const columns = [
  {
    Header: 'Name',
    Cell: CellName,
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Tel',
    accessor: 'tel',
  },
  {
    Header: 'User Account',
    accessor: 'userAccount',
  },
  {
    Header: 'Status',
    id: 'status',
  },
  {
    accessor: 'setAsAdmin',
    columnProps: {
      style: { minWidth: '105px' },
    },
  },
]

const mockData = [
  {
    name: 'John smith',
    title: 'CTO',
    email: 'johnsmith@proptech.com',
    tel: '07896 765',
    userAccount: 'Admin',
    status: '',
  },
]

export const prepareData = (data, handleOpenSetAdminModal, setSelectedUser) => {
  return data.map(item => ({
    ...item,
    setAsAdmin: (
      <a
        data-test="button-cancel"
        className={styles.hyperlinked}
        onClick={() => {
          setSelectedUser(item)
          handleOpenSetAdminModal()
        }}
      >
        Set as Admin
      </a>
    ),
  }))
}

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () => {
  setModalOpen(isVisible)
}

export const Members: React.FC = () => {
  const [isSetAdminModalOpen, setIsSetAdminModalOpen] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<any>(null)

  const handleOpenSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, true)
  const handleCloseSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, false)

  const data = prepareData(mockData, handleOpenSetAdminModal, setSelectedUser)

  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Members</H3>
          <Table scrollable={true} loading={false} data={data} columns={columns} />
        </FlexContainerResponsive>
      </Content>
      <SetAsAdminModal
        visible={isSetAdminModalOpen}
        afterClose={handleCloseSetAdminModal}
        username={selectedUser?.name}
      />
    </FlexContainerBasic>
  )
}
