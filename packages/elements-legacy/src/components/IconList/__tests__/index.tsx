import * as React from 'react'
import { render } from '@testing-library/react'
import { FaClock, FaStreetView, FaStickyNote } from 'react-icons/fa'
import { IconList } from '..'

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
      render(
        <IconList
          items={items}
          textClassName="text-class-name"
          listClassName="list-class-name"
          iconClassName="icon-class-name"
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with default props', () => {
    expect(render(<IconList items={items} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
