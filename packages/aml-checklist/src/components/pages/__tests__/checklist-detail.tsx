import React from 'react'
import { render } from '../../../tests/react-testing'
import {
  mapDispatchToProps,
  mapStateToProps,
  ChecklistDetail,
  CheckListDetailProps,
  generateSection,
  renderSections,
} from '../checklist-detail'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import { getMockRouterProps } from '@/helper/mock/mock-router'
import { sectionsStatus } from '@/sagas/__stubs__/status'
import { defaultStatus } from '@/constants/section-status'

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
          modalContentType: 'PROFILE',
          checklistDetailData: {
            contact: contact,
          },
          status: sectionsStatus,
        },
      } as ReduxState
      const expected = {
        isModalVisible: true,
        loading: true,
        contact: contact,
        modalContentType: 'PROFILE',
        status: sectionsStatus,
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })

    it('should run when undefined', () => {
      const input = {
        checklistDetail: {},
      } as ReduxState
      const expected = {
        isModalVisible: false,
        loading: false,
        contact: {},
        modalContentType: 'PROFILE',
        status: defaultStatus,
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
        logout: jest.fn(),
        contact: contact,
        status: sectionsStatus,
        modalContentType: 'PROFILE',
        mode: 'WEB',
        ...getMockRouterProps({ id: '123' }),
      }
      const wrapper = render(<ChecklistDetail {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot when not loading', () => {
      const mockProps = {
        isModalVisible: true,
        loading: false,
        hideModal: jest.fn(),
        showModal: jest.fn(),
        logout: jest.fn(),
        contact: contact,
        status: sectionsStatus,
        mode: 'WEB',
        modalContentType: 'PROFILE',
        ...getMockRouterProps({ id: '123' }),
      }
      const wrapper = render(<ChecklistDetail {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('generateSection', () => {
    it('should run correctly', () => {
      const onClick = jest.fn(() => jest.fn())
      const result = generateSection(sectionsStatus, onClick)
      expect(result).toHaveLength(6)
    })
  })
  describe('renderSection', () => {
    const mockOnClick = jest.fn(() => jest.fn())
    const sections = generateSection(sectionsStatus, mockOnClick)
    const result = renderSections(sections)
    expect(result).toHaveLength(6)
    const wrapper = render(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })
})
