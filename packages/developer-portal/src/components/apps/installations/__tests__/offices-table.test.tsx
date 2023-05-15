import React from 'react'
import { render } from '../../../../tests/react-testing'
import { OfficesTable } from '../offices-table'

describe('OfficesTable', () => {
  it('should match a snapshot', () => {
    expect(render(<OfficesTable offices={[{ id: 'FOO', name: 'BAR' }]} />)).toMatchSnapshot()
  })
})
