import React from 'react'
import { shallow } from 'enzyme'
import AccountProvisionModal from '../account-provision-modal'

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
