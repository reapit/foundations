import React from 'react'
import { shallow } from 'enzyme'
import { contact } from '@/sagas/__stubs__/contact'
import { PrimaryIdentification, mapStateToProps, mapDispatchToProps } from '../primary-identification'
import { ReduxState } from '@/types/core'
describe('PrimaryIdentification', () => {
  describe('PrimaryIdentification', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contact: contact,
        identityCheckModel: null,
        initFormValues: {},
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
    xit('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          isSubmitting: false,
          checklistDetailData: {
            contact
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        loading: false,
        contact: contact,
        initFormValues: {
          ...contact.metadata['primaryId'][0]['documents'][0],
          expiry: new Date('2019-10-15T10:00:00.00Z')
        }
      }
      expect(result).toEqual(expected)
    })

    it('should return correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        loading: false,
        contact: null,
        initFormValues: {
          details: '',
          expiry: undefined,
          fileUrl: undefined,
          typeId: ''
        }
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

    it('onPrevHandler', () => {
      const mockDispatch = jest.fn()
      const { onPrevHandler } = mapDispatchToProps(mockDispatch)
      onPrevHandler()
      expect(mockDispatch).toBeCalled()
    })

    it('onNextHandler', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler({})()
      expect(mockDispatch).toBeCalled()
    })
  })
})
