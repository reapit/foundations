import { shallow } from 'enzyme'
import { List, OrderList, BulletList } from '../list'
import React from 'react'
import { FaClock, FaStreetView, FaStickyNote } from 'react-icons/fa'

describe('List', () => {
  it('should match snapshot', () => {
    const items = [
      { value: 'Viewing', icon: <FaStreetView /> },
      { value: '11:00 AM - 12:00 PM', icon: <FaClock /> },
      { value: 'Info about the viewing', icon: <FaStickyNote /> },
    ]

    expect(shallow(<List items={items} />)).toMatchSnapshot()
  })
})

describe('OrderList', () => {
  it('should match snapshot', () => {
    const items = [{ value: 'Viewing' }, { value: '11:00 AM - 12:00 PM' }, { value: 'Info about the viewing' }]

    expect(shallow(<OrderList items={items} />)).toMatchSnapshot()
  })
})

describe('BulletList', () => {
  it('should match snapshot', () => {
    const items = [{ value: 'Viewing' }, { value: '11:00 AM - 12:00 PM' }, { value: 'Info about the viewing' }]

    expect(shallow(<BulletList items={items} />)).toMatchSnapshot()
  })
})
