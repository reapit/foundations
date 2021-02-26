import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { FaClock, FaStreetView, FaStickyNote } from 'react-icons/fa'
import { IconList, IcomListProps } from './index'

const items = [
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

export default {
  title: 'Rereshed-Docs/IconList',
  component: IconList,
}

export const Primary: Story<IcomListProps> = (args) => <IconList {...args} />
Primary.args = {
  items,
}
