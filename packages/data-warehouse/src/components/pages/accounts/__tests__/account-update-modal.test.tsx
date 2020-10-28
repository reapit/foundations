import React from 'react'
import { shallow } from 'enzyme'
import AccountUpdateModal from '../account-update-modal'

describe('AccountUpdateModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AccountUpdateModal visible={true} accountId="SOME_ID" handleClose={jest.fn()} />)).toMatchSnapshot()
  })
})
