import React from 'react'
import { FaClock, FaStreetView, FaStickyNote } from 'react-icons/fa'
import { storiesOf } from '@storybook/react'
import { IconList } from './index'

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

storiesOf('IconList', module).add('Primary', () => {
  return (
    <section className="section">
      <IconList items={items} />
    </section>
  )
})
