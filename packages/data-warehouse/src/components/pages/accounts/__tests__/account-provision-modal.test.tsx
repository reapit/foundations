import React from 'react'
import { render } from '../../../../tests/react-testing'
import { AccountProvisionModal } from '../account-provision-modal'

describe('AccountProvisionModal', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AccountProvisionModal
          setProvisionInProgress={jest.fn()}
          setPercentageComplete={jest.fn()}
          closeModal={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
