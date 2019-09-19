import React from 'react'
import { shallow } from 'enzyme'
import { CreateIdentityDocumentModel } from '@/types/contact-api-schema'
import { SecondaryIdentification, mapStateToProps, mapDispatchToProps } from '../secondary-identification'

describe('secondary identification forms', () => {
  describe('SecondaryIdentification', () => {
    it('should render correctly', () => {
      const mockProps = {
        data: {} as CreateIdentityDocumentModel,
        loading: false,
        updateIdentification: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn()
      }

      const wrapper = shallow(<SecondaryIdentification {...mockProps} />)
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
