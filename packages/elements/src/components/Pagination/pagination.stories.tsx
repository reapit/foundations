import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { Pagination } from '.'
import { Section } from '@/components/Layout'

const stories = storiesOf('Pagination', module)

const Usage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Pagination pageNumber={pageNumber} onChange={setPageNumber} pageSize={10} totalCount={100} />
    </Section>
  )
}

const UsageWithDisabled = () => {
  const [pageNumber, setPageNumber] = useState(1)
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Pagination pageNumber={pageNumber} onChange={setPageNumber} pageSize={10} totalCount={20} />
    </Section>
  )
}

stories.add('Primary', () => <Usage />).add('Disabled Next and Prev', () => <UsageWithDisabled />)
