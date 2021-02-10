import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { FaClock, FaStreetView, FaStickyNote } from 'react-icons/fa'
import {
  OrderList as OrderListComponent,
  BulletList as BulletListComponent,
  List as ListComponent,
  ListProps,
} from './list'

export default {
  title: 'List',
  component: ListComponent,
  argTypes: {},
} as Meta

const Template: Story<ListProps> = args => <ListComponent {...args} />

export const List = Template.bind({})
List.args = {
  items: [
    { value: 'Viewing', icon: <FaStreetView /> },
    { value: '11:00 AM - 12:00 PM', icon: <FaClock /> },
    { value: 'Info about the viewing', icon: <FaStickyNote /> },
  ],
}

const BulletListTemplate: Story<ListProps> = args => <BulletListComponent {...args} />
export const BulletList = BulletListTemplate.bind({})
BulletList.args = {
  items: [{ value: 'Viewing' }, { value: '11:00 AM - 12:00 PM' }, { value: 'Info about the viewing' }],
}

const OrderListTemplate: Story<ListProps> = args => <OrderListComponent {...args} />
export const OrderList = OrderListTemplate.bind({})
OrderList.args = {
  items: [{ value: 'Viewing' }, { value: '11:00 AM - 12:00 PM' }, { value: 'Info about the viewing' }],
}
