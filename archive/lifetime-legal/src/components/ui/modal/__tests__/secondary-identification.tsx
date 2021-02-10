import React from 'react'
import { shallow } from 'enzyme'
import { contact } from '@/sagas/__stubs__/contact'
import { identityCheck } from '@/sagas/__stubs__/identity-check'
import { SecondaryIdentification, mapStateToProps, mapDispatchToProps } from '../secondary-identification'
import { ReduxState } from '@/types/core'
import { IDENTIFICATION_FORM_DEFAULT_VALUES } from '../../forms/identification'
describe('SecondaryIdentification', () => {
  describe('SecondaryIdentification', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contactModel: contact,
        initFormValues: {},
        loading: false,
        identityCheck: identityCheck,
        updateIdentification: jest.fn(),
      }
      const wrapper = shallow(<SecondaryIdentification {...mockProps} />)
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
            idCheck: identityCheck,
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
        initFormValues: {
          details: '12312312',
          documentId: '',
          expiry: new Date('2020-01-29'),
          typeId: 'BC',
        },
        identityCheck: identityCheck,
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
        identityCheck: {},
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
