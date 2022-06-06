import React from 'react'
import { render } from '../../../../tests/react-testing'
import { contact } from '@/sagas/__stubs__/contact'
import { PrimaryIdentification, mapStateToProps, mapDispatchToProps } from '../primary-identification'
import { ReduxState } from '@/types/core'
import { idCheck } from '@/sagas/__stubs__/id-check'
import { IdentityDocumentForm } from '../../forms/identification'

describe('PrimaryIdentification', () => {
  describe('PrimaryIdentification', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contact: contact,
        identityCheckModel: null,
        initFormValues: {} as IdentityDocumentForm,
        loading: false,
        updateIdentification: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
      }
      const wrapper = render(<PrimaryIdentification {...mockProps} />)
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
            idCheck,
          },
        },
      } as ReduxState
      const result = mapStateToProps(mockState)

      const expected = {
        loading: false,
        contact: contact,
        initFormValues: {
          typeId: idCheck.identityDocument1?.typeId,
          details: idCheck.identityDocument1?.details,
          expiry: idCheck.identityDocument1?.expiry,
          documentId: 'SOME_ID',
        },
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
          expiry: '',
          documentId: '',
          typeId: '',
        },
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
