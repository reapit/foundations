import React from 'react'
import { render } from '../../../tests/react-testing'
import AccountProvisionModal, { AccountProvisionForm } from '../account-provision-modal'

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

describe('AccountProvisionForm', () => {
  it('should match a snapshot', () => {
    expect(render(<AccountProvisionForm handleClose={jest.fn()} />)).toMatchSnapshot()
  })
})
