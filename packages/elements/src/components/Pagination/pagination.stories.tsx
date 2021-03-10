import React from 'react'
import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react/types-6-0'
import { Pagination, PaginationProps } from '.'

export default {
  title: 'Components/Pagination',
  component: Pagination,
}

export const Primary: Story<PaginationProps> = (args) => <Pagination {...args} />
Primary.args = {
  pageNumber: 1,
  pageSize: 10,
  totalCount: 100,
  onChange: (pageNumber) => action(`Selected page number ${pageNumber}`),
}

export const DisabledNextAndPrev: Story<PaginationProps> = (args) => <Pagination {...args} />
DisabledNextAndPrev.args = {
  pageNumber: 1,
  pageSize: 10,
  totalCount: 11,
  onChange: (pageNumber) => action(`Selected page number ${pageNumber}`),
}
