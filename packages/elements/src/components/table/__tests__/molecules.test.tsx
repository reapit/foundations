import React from 'react'
import { shallow } from 'enzyme'
import {
  TableHeadersRow,
  TableHeader,
  TableRow,
  TableRowContainer,
  TableCell,
  TableExpandableRowTriggerCell,
  TableExpandableRow,
  TableCtaTriggerCell,
  resolveNarrowOrderClass,
} from '../molecules'
import * as styles from '../__styles__'

describe('TableHeadersRow Component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<TableHeadersRow />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TableHeader Component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<TableHeader />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TableRow Component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<TableRow />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TableCell Component', () => {
  it('should match a snapshot with no props', () => {
    const wrapper = shallow(<TableCell />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with full props', () => {
    const wrapper = shallow(
      <TableCell className="foo-bar" icon="addSystem" darkText narrowLabel="Label" narrowIsFullWidth narrowOrder={1} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TableExpandableRowTriggerCell Component', () => {
  it('should match a snapshot with no children and open', () => {
    const wrapper = shallow(<TableExpandableRowTriggerCell isOpen narrowIsFullWidth />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with no children and closed', () => {
    const wrapper = shallow(<TableExpandableRowTriggerCell />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with children', () => {
    const wrapper = shallow(
      <TableExpandableRowTriggerCell>
        <div>I am a child</div>
      </TableExpandableRowTriggerCell>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TableCtaTriggerCell Component', () => {
  it('should match a snapshot with no children and an icon', () => {
    const wrapper = shallow(<TableCtaTriggerCell icon="addSystem" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with children and no icon', () => {
    const wrapper = shallow(
      <TableCtaTriggerCell>
        <div>I am a child</div>
      </TableCtaTriggerCell>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with no children and no icon', () => {
    const wrapper = shallow(<TableCtaTriggerCell />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TableExpandableRow Component', () => {
  it('should match a snapshot when open', () => {
    const wrapper = shallow(<TableExpandableRow isOpen />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when not open', () => {
    const wrapper = shallow(<TableExpandableRow isOpen />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TableRowContainer Component', () => {
  it('should match a snapshot when open', () => {
    const wrapper = shallow(<TableRowContainer isOpen />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when not open', () => {
    const wrapper = shallow(<TableRowContainer isOpen />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('resolveNarrowOrderClass', () => {
  const orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  orders.forEach((order) => {
    it(`should return the correct class for order ${order}`, () => {
      expect(resolveNarrowOrderClass(order)).toEqual(styles[`ElTableCellNarrowOrder${order}`])
    })
  })
})
