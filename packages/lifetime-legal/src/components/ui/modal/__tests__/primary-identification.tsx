import React from 'react'
import { shallow } from 'enzyme'
import { contact } from '@/sagas/__stubs__/contact'
import { PrimaryIdentification, mapStateToProps, mapDispatchToProps } from '../primary-identification'
import { ReduxState } from '@/types/core'
import { IDENTIFICATION_FORM_DEFAULT_VALUES } from '../../forms/identification'
describe('PrimaryIdentification', () => {
  describe('PrimaryIdentification', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contactModel: contact,
        initFormValues: {},
        loading: false,
        updateIdentification: jest.fn(),
      }
      const wrapper = shallow(<PrimaryIdentification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          isSubmitting: false,
          checklistDetailData: {
            contact,
            idCheck: null,
          },
        },
        auth: {
          refreshSession: {
            desktopMode: 'DESKTOP',
          },
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        loading: false,
        contactModel: contact,
        initFormValues: IDENTIFICATION_FORM_DEFAULT_VALUES,
      }
      expect(result).toEqual(expected)
    })

    it('should return correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        loading: false,
        contactModel: {},
        initFormValues: IDENTIFICATION_FORM_DEFAULT_VALUES,
      }
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('updateIdentification', () => {
      const mockDispatch = jest.fn()
      const { updateIdentification } = mapDispatchToProps(mockDispatch)
      updateIdentification({} as any)
      expect(mockDispatch).toBeCalled()
    })
  })
})
