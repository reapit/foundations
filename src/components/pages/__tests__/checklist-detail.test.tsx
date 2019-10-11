import React from 'react'
import { shallow } from 'enzyme'
import {
  mapDispatchToProps,
  mapStateToProps,
  ChecklistDetail,
  CheckListDetailProps,
  generateSection,
  renderSections
} from '../checklist-detail'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import { getMockRouterProps } from '@/helper/mock-router'

describe('checklist-detail', () => {
  describe('mapDispatchToProps', () => {
    it('hideModal', () => {
      const mockDispatch = jest.fn()
      const { hideModal } = mapDispatchToProps(mockDispatch)
      hideModal()
      expect(mockDispatch).toBeCalled()
    })

    it('showModal', () => {
      const mockDispatch = jest.fn()
      const { showModal } = mapDispatchToProps(mockDispatch)
      showModal('Test')()
      expect(mockDispatch).toBeCalled()
    })
  })
  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const input = {
        checklistDetail: {
          isModalVisible: true,
          loading: true,
          isSubmitting: true,
          modalContentType: 'PROFILE',
          checklistDetailData: {
            contact: contact
          }
        },
        submitChecks: {
          formState: 'PENDING'
        }
      } as ReduxState
      const expected = {
        isModalVisible: true,
        loading: true,
        contact: contact,
        modalContentType: 'PROFILE',
        submitChecksFormState: 'PENDING'
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })

    it('should run when undefined', () => {
      const input = {
        checklistDetail: {},
        submitChecks: {
          formState: 'PENDING'
        }
      } as ReduxState
      const expected = {
        isModalVisible: false,
        loading: true,
        contact: {},
        modalContentType: 'PROFILE',
        submitChecksFormState: 'PENDING'
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })
  })

  describe('ChecklistDetail', () => {
    it('should match snapshot when loading', () => {
      const mockProps = {
        isModalVisible: true,
        loading: true,
        hideModal: jest.fn(),
        showModal: jest.fn(),
        contact: contact,
        modalContentType: 'PROFILE',
        ...getMockRouterProps({ id: '123' }),
        submitChecksFormState: 'PENDING',
        submitChecks: jest.fn()
      } as CheckListDetailProps
      const wrapper = shallow(<ChecklistDetail {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('Loader')).toHaveLength(1)
    })
    it('should match snapshot when not loading', () => {
      const mockProps = {
        isModalVisible: true,
        loading: false,
        hideModal: jest.fn(),
        showModal: jest.fn(),
        submitChecks: jest.fn(),
        contact: contact,
        modalContentType: 'PROFILE',
        submitChecksFormState: 'PENDING',
        ...getMockRouterProps({ id: '123' })
      } as CheckListDetailProps
      const wrapper = shallow(<ChecklistDetail {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('Loader')).toHaveLength(0)
    })
  })
  describe('generateSection', () => {
    it('should run correctly', () => {
      const onClick = jest.fn(() => jest.fn())
      const result = generateSection(onClick)
      expect(result).toHaveLength(5)
    })
  })
  describe('renderSection', () => {
    const mockOnClick = jest.fn(() => jest.fn())
    const sections = generateSection(mockOnClick)
    const result = renderSections(sections)
    expect(result).toHaveLength(5)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })
})
