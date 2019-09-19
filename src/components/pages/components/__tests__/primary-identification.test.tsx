import React from 'react'
import { shallow } from 'enzyme'
import { CreateIdentityDocumentModel } from '@/types/contact-api-schema'
import { PrimaryIdentification, mapStateToProps, mapDispatchToProps } from '../primary-identification'

describe('primary identification forms', () => {
  describe('PrimaryIdentification', () => {
    it('should render correctly', () => {
      const mockProps = {
        data: {} as CreateIdentityDocumentModel,
        loading: false,
        updateIdentification: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn()
      }

      const wrapper = shallow(<PrimaryIdentification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    const result = mapStateToProps()
    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('loading')
  })

  describe('mapDispatchToProps', () => {
    const result = mapDispatchToProps()
    expect(result).toHaveProperty('updateIdentification')
  })
})
