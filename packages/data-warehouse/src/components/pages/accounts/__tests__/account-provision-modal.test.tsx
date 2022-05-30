import React from 'react'
import { render } from '../../../../tests/react-testing'
import AccountProvisionModal from '../account-provision-modal'

describe('AccountProvisionModal', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AccountProvisionModal
          visible={true}
          setAccounts={jest.fn()}
          setProvisionInProgress={jest.fn()}
          setPercentageComplete={jest.fn()}
          handleClose={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
