import * as React from 'react'
import { H3, FlexContainerResponsive, Content, FlexContainerBasic, Table } from '@reapit/elements'

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
    <div className="inline-flex items-center inline-flex">
      <FlexContainerBasic flexColumn centerContent>
        <div>{email}</div>
        <div>{title}</div>
      </FlexContainerBasic>
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
