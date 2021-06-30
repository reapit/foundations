import React from 'react'
import { shallow } from 'enzyme'
import {
  Table,
  TableHeadersRow,
  TableHeader,
  TableRow,
  TableRowContainer,
  TableCell,
  TableExpandableRowTriggerCell,
  TableExpandableRow,
} from '../'
import { Icon } from '@/components/icon'

describe('Table Component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Table />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
      <Table
        rows={[
          {
            cells: [
              {
                label: 'Property',
                value: 'Mt Ash Jacket, Brassey Road',
                icon: 'home',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Customer',
                value: 'Mr Johnny Corrigan',
                icon: 'username',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Client A/C',
                value: 'Alternate Lettings Client Acc',
              },
              {
                label: 'Description',
                value: 'Tenant Payment Request',
              },
              {
                label: 'Request Date',
                value: '19 Apr 2021',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Amount',
                value: '£50.00',
                cellHasDarkText: true,
              },
              {
                label: 'Payment Status',
                value: 'Not Requested',
                narrowTable: {
                  isFullWidth: true,
                },
              },
            ],
            expandableContent: <p>I am the content that is only visible when expanded</p>,
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
      <Table>
        <TableHeadersRow>
          <TableHeader>Property</TableHeader>
          <TableHeader>Customer</TableHeader>
          <TableHeader>Client A/C</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Request Date</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Payment Status</TableHeader>
          <TableHeader>
            <Icon icon="solidEdit" fontSize="1.2rem" />
          </TableHeader>
        </TableHeadersRow>
        <TableRowContainer>
          <TableRow>
            <TableCell darkText icon="home">
              Mt Ash Jacket
              <br />
              Brassey Road
            </TableCell>
            <TableCell narrowLabel="N_Customer" icon="username">
              Mr Johnny Corrigan
            </TableCell>
            <TableCell>Alternate Lettings Client Acc</TableCell>
            <TableCell>Tenant Payment Request</TableCell>
            <TableCell narrowLabel="Request Date">19 Apr 2021</TableCell>
            <TableCell darkText>£50.00</TableCell>
            <TableCell narrowIsFullWidth>Not Requested</TableCell>
            <TableExpandableRowTriggerCell />
          </TableRow>
          <TableExpandableRow>I am the content that is only visible when expanded</TableExpandableRow>
        </TableRowContainer>
      </Table>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
      <Table expandableContentSize="medium">
        <TableHeadersRow>
          <TableHeader>Property</TableHeader>
          <TableHeader>Customer</TableHeader>
          <TableHeader>Client A/C</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Request Date</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Payment Status</TableHeader>
          <TableHeader>
            <Icon icon="solidEdit" fontSize="1.2rem" />
          </TableHeader>
        </TableHeadersRow>
        <TableRowContainer>
          <TableRow>
            <TableCell darkText icon="home">
              Mt Ash Jacket
              <br />
              Brassey Road
            </TableCell>
            <TableCell narrowLabel="N_Customer" icon="username">
              Mr Johnny Corrigan
            </TableCell>
            <TableCell>Alternate Lettings Client Acc</TableCell>
            <TableCell>Tenant Payment Request</TableCell>
            <TableCell narrowLabel="Request Date">19 Apr 2021</TableCell>
            <TableCell darkText>£50.00</TableCell>
            <TableCell narrowIsFullWidth>Not Requested</TableCell>
            <TableExpandableRowTriggerCell />
          </TableRow>
          <TableExpandableRow>I am the content that is only visible when expanded</TableExpandableRow>
        </TableRowContainer>
      </Table>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
        <TableHeadersRow>
          <TableHeader>Property</TableHeader>
          <TableHeader>Customer</TableHeader>
          <TableHeader>Client A/C</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Request Date</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Payment Status</TableHeader>
          <TableHeader>
            <Icon icon="solidEdit" fontSize="1.2rem" />
          </TableHeader>
        </TableHeadersRow>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
      <TableCell darkText icon="home">
        Mt Ash Jacket
        <br />
        Brassey Road
      </TableCell>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
      <TableRowContainer isOpen>
        <TableRow>
          <TableCell darkText icon="home">
            Mt Ash Jacket
            <br />
            Brassey Road
          </TableCell>
          <TableCell narrowLabel="N_Customer" icon="username">
            Mr Johnny Corrigan
          </TableCell>
          <TableCell>Alternate Lettings Client Acc</TableCell>
          <TableCell>Tenant Payment Request</TableCell>
          <TableCell narrowLabel="Request Date">19 Apr 2021</TableCell>
          <TableCell darkText>£50.00</TableCell>
          <TableCell>Not Requested</TableCell>
          <TableExpandableRowTriggerCell isOpen />
        </TableRow>
        <TableExpandableRow isOpen>I am the content that is only visible when expanded</TableExpandableRow>
      </TableRowContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
      <TableHeader>Property</TableHeader>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(
      <TableRow></TableRow>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
