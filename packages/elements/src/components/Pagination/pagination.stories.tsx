import React from 'react'
import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react/types-6-0'
import { Pagination, PaginationProps } from '.'
import { Section } from '@/components/Layout'

export default {
  title: 'Rereshed-Docs/Pagination',
  component: Pagination,
}

export const Primary: Story<PaginationProps> = (args) => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <Pagination {...args} />
  </Section>
)
Primary.args = {
  pageNumber: 1,
  pageSize: 10,
  totalCount: 100,
  onChange: (pageNumber) => action(`Selected page number ${pageNumber}`),
}

export const DisabledNextAndPrev: Story<PaginationProps> = (args) => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <Pagination {...args} />
  </Section>
)
DisabledNextAndPrev.args = {
  pageNumber: 1,
  pageSize: 10,
  totalCount: 11,
  onChange: (pageNumber) => action(`Selected page number ${pageNumber}`),
}
