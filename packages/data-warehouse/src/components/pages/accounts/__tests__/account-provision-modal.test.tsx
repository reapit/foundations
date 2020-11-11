import React from 'react'
import { shallow } from 'enzyme'
import AccountProvisionModal, { AccountProvisionForm } from '../account-provision-modal'

describe('AccountProvisionModal', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
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
    expect(shallow(<AccountProvisionForm handleClose={jest.fn()} />)).toMatchSnapshot()
  })
})
