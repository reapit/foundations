import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { SelectIdentity, SelectIdentityProps, mapStateToProps, generateListIdentity } from '../select-identity'
import { identityTypes } from '@/sagas/__stubs__/identity-types'
import { ReduxState } from '@/types/core'

const props = (loading: boolean): SelectIdentityProps => ({
  labelText: 'idType',
  id: 'idType',
  name: 'idType',
  identityState: {
    loading: loading,
    identityTypes: identityTypes,
  },
})

describe('Select identity', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(render(<SelectIdentity {...props(true)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(render(<SelectIdentity {...props(false)} />)).toMatchSnapshot()
  })

  describe('generateListIdentity', () => {
    it('should run correctly', () => {
      const identityTypes = []
      const fn = generateListIdentity(identityTypes)()
      expect(fn).toEqual([])
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        identityTypes: {
          loading: false,
          identityTypes: identityTypes,
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        identityState: {
          loading: false,
          identityTypes: identityTypes,
        },
      })
    })
  })
})
