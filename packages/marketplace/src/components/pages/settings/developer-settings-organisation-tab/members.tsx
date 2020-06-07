import * as React from 'react'
import styles from '@/styles/pages/developer-settings-organisation-tab.scss?mod'
import { H3, FlexContainerResponsive, Content, FlexContainerBasic, Table } from '@reapit/elements'

export const CellName = ({
  row: {
    original: { email, title },
  },
}) => {
  return (
    <div className={styles.nameColumn}>
      <div>{email}</div>
      <div>{title}</div>
    </div>
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

export const Members: React.FC = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Members</H3>
          <Table scrollable={true} loading={false} data={mockData} columns={columns} />
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}
