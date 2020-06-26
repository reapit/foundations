import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import { Formik, Form } from '@reapit/elements'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import GeneralInformationSection, { prepareCategoryOptions } from '../general-information-section'
import { appCategorieStub } from '@/sagas/__stubs__/app-categories'

describe('GeneralInformationSection', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>
              <GeneralInformationSection />
            </Form>
          </Formik>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('prepareCategoryOptions', () => {
    it('should run correctly', () => {
      const result = prepareCategoryOptions(appCategorieStub.data || [])
      expect(result).toEqual([
        { label: 'Game', value: '3' },
        { label: 'entertainment', value: '2' },
        { label: 'education', value: '1' },
      ])
    })
  })
})
