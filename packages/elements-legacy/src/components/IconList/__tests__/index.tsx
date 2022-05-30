import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { FaClock, FaStreetView, FaStickyNote } from 'react-icons/fa'
import { IconList } from '..'
import toJson from 'enzyme-to-json'

export const items = [
  {
    icon: <FaClock className="icon-list-icon" />,
    text: '11:00 AM - 12:00 PM',
  },
  {
    icon: <FaStreetView className="icon-list-icon" />,
    text: 'Viewing',
  },
  {
    icon: <FaStickyNote className="icon-list-icon" />,
    text: 'Info about the viewing',
  },
]

describe('IconList', () => {
  it('should match a snapshot with custom props', () => {
    expect(
      toJson(
        render(
          <IconList
            items={items}
            textClassName="text-class-name"
            listClassName="list-class-name"
            iconClassName="icon-class-name"
          />,
        ),
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with default props', () => {
    expect(toJson(render(<IconList items={items} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
