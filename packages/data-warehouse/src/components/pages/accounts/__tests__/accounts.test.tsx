import * as React from 'react'
import { shallow } from 'enzyme'
import Accounts from '../accounts'
import { RecoilRoot } from 'recoil'

describe('Accounts', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <RecoilRoot>
          <Accounts />
        </RecoilRoot>,
      ),
    ).toMatchSnapshot()
  })
})
