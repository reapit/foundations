import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  DeveloperAppModalInner,
  DeveloperAppInnerProps,
  CheckboxElement,
  handleUseEffect,
  mapStateToProps,
  mapDispatchToProps
} from '../developer-app-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { Button } from '@reapit/elements'
import { Formik } from 'formik'
import { ReduxState } from '@/types/core'

// @ts-ignore: just need to pick relevant props to test
const props = (loading: boolean, error: boolean): DeveloperAppInnerProps => ({
  appDetailState: { loading, error, appDetailData: { data: appDetailDataStub.data } },
  submitRevisionState: { formState: 'PENDING' }
})

describe('DeveloperAppModalInner', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...props(true, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...props(false, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when ERROR true', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...props(false, true)} />))).toMatchSnapshot()
  })

  describe('CheckboxElement run correctly', () => {
    it('when CheckboxElement have scope', () => {
      const scopes = [
        { name: 'Marketplace/properties.read', description: 'Read data about properties' },
        { name: 'Marketplace/properties.write', description: 'Write data about properties' }
      ]
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(2)
    })
    it('when CheckboxElement have scope', () => {
      const scopes = [{ name: 'Marketplace/properties.read', description: 'Read data about properties' }]
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(1)
    })

    it('when CheckboxElement have no scopes', () => {
      const scopes = undefined
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(0)
    })
    it('when CheckboxElement have [] scopes', () => {
      const scopes = []
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(0)
    })
    it('when CheckboxElement have null scopes', () => {
      const scopes = []
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(0)
    })
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const mockProps = {
        isSucceeded: true,
        setDeveloperAppModalStateViewDetail: jest.fn(),
        closeParentModal: jest.fn()
      }
      const fn = handleUseEffect(mockProps)
      fn()
      expect(mockProps.closeParentModal).toBeCalled()
      expect(mockProps.setDeveloperAppModalStateViewDetail).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick neccessary component
      const mockState = {
        developer: {
          developerData: {
            scopes: []
          }
        },
        appDetail: {},
        submitRevision: {}
      } as ReduxState
      const mockOwnProps = {
        closeParentModal: jest.fn()
      }
      const result = mapStateToProps(mockState, mockOwnProps)
      expect(result).toEqual({
        allScopes: [],
        appDetailState: {},
        closeParentModal: mockOwnProps.closeParentModal,
        submitRevisionState: {}
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('submitRevision', () => {
      const mockDispatch = jest.fn()
      const { submitRevision } = mapDispatchToProps(mockDispatch)
      submitRevision('123', { scopes: [] })
      expect(mockDispatch).toBeCalled()
    })
    it('submitRevisionSetFormState', () => {
      const mockDispatch = jest.fn()
      const { submitRevisionSetFormState } = mapDispatchToProps(mockDispatch)
      submitRevisionSetFormState('PENDING')
      expect(mockDispatch).toBeCalled()
    })
    it('setDeveloperAppModalStateEditDetail', () => {
      const mockDispatch = jest.fn()
      const { setDeveloperAppModalStateEditDetail } = mapDispatchToProps(mockDispatch)
      setDeveloperAppModalStateEditDetail()
      expect(mockDispatch).toBeCalled()
    })
    it('setDeveloperAppModalStateViewDetail', () => {
      const mockDispatch = jest.fn()
      const { setDeveloperAppModalStateViewDetail } = mapDispatchToProps(mockDispatch)
      setDeveloperAppModalStateViewDetail()
      expect(mockDispatch).toBeCalled()
    })
  })
})
