import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { Pagination } from '.'

const stories = storiesOf('Pagination', module)

const Usage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  return (
    <section className="section">
      <Pagination pageNumber={pageNumber} onChange={setPageNumber} pageSize={10} totalCount={100} />
    </section>
  )
}

const UsageWithDisabled = () => {
  const [pageNumber, setPageNumber] = useState(1)
  return (
    <section className="section">
      <Pagination pageNumber={pageNumber} onChange={setPageNumber} pageSize={10} totalCount={20} />
    </section>
  )
}

stories.add('Primary', () => <Usage />).add('Disabled Next and Prev', () => <UsageWithDisabled />)
