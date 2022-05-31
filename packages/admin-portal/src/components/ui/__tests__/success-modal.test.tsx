import SuccessModal from '../success-modal'
import { render } from '../../../tests/react-testing'
import * as React from 'react'

describe('SetAsAdminModal', () => {
  it('should match snapshot', () => {
    const user = {
      name: 'Jill Hill',
    }
    expect(render(<SuccessModal name={user.name} />)).toMatchSnapshot()
  })
})
