import * as React from 'react'
import { shallow } from 'enzyme'
import CostFilterForm, { CostFilterFormProps, handleAutoSave } from '../cost-filter-form'
import { CostFilterFormValues } from '../cost-explorer'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import * as redux from 'react-redux'
import { developerState } from '@/sagas/__stubs__/developer'

const mockState = {
  developer: developerState,
} as ReduxState

describe('CostFilterForm', () => {
  const mockStore = configureStore()
  const store = mockStore(mockState)

  const mockProps: CostFilterFormProps = {
    initialValues: {
      createdMonth: '2020-04',
    },
    onSave: jest.fn(),
  }
  const spy = jest.spyOn(redux, 'useSelector')
  spy.mockReturnValue(true)
  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <CostFilterForm {...mockProps} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleAutoSave', () => {
    it('should run correctly', () => {
      const onSave = jest.fn()
      const mockFormValues: CostFilterFormValues = {
        createdMonth: '2020-05',
      }
      const fn = handleAutoSave(onSave)
      fn(mockFormValues)
      expect(onSave).toBeCalledWith(mockFormValues)
    })
  })
})
