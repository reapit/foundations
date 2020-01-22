import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SelectIdentity, SelectIdentityProps } from '../select-identity'
import { identityTypes } from '@/sagas/__stubs__/identity-types'

const props = (loading: boolean): SelectIdentityProps => ({
  labelText: 'idType',
  id: 'idType',
  name: 'idType',
  identityState: {
    loading: loading,
    identityTypes: identityTypes
  }
})

describe('Select identity', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<SelectIdentity {...props(true)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<SelectIdentity {...props(false)} />))).toMatchSnapshot()
  })
})
