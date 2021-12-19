import { render } from '@testing-library/react'
import React from 'react'
import { PermissionsOptionsContent } from '../permissions-options-content'

describe('PermissionsOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<PermissionsOptionsContent />)).toMatchSnapshot()
  })
})
