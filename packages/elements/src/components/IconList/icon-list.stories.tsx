import React from 'react'
import { FaClock, FaStreetView, FaStickyNote } from 'react-icons/fa'
import { storiesOf } from '@storybook/react'
import { IconList } from './index'
import { Section } from '@/components/Layout'

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
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <IconList items={items} />
    </Section>
  )
})
