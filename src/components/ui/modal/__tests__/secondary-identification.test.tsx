import React from 'react'
import { shallow } from 'enzyme'
import { contact } from '@/sagas/__stubs__/contact'
import { SecondaryIdentification, mapStateToProps, mapDispatchToProps } from '../secondary-identification'
import { ReduxState } from '@/types/core'
describe('SecondaryIdentification', () => {
  describe('SecondaryIdentification', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contactModel: contact,
        initFormValues: {},
        loading: false,
        updateIdentification: jest.fn(),
        isDesktopMode: false
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
            contact
          }
        },
        auth: {
          refreshSession: {
            desktopMode: 'DESKTOP'
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        loading: false,
        contactModel: contact,
        initFormValues: {
          ...contact.metadata['secondaryId'][0]['documents'][0],
          expiry: new Date('2019-10-10T00:00:00Z')
        },
        isDesktopMode: false
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
        initFormValues: {
          details: undefined,
          expiry: null,
          fileUrl: undefined,
          typeId: ''
        },
        isDesktopMode: false
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
