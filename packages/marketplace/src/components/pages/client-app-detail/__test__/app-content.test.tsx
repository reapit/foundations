import React from 'react'
import AppContent, {
  renderCategory,
  renderDescripion,
  renderDesktopIntegrationTypes,
  renderExtraMedia,
  renderPermissions,
} from '../app-content'

import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

import { shallow } from 'enzyme'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'

describe('AppContent', () => {
  test('renderCategory - should match snapshot', () => {
    const result = renderCategory(appDetailDataStub.data.category)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })
  test('renderDescripion - should match snapshot', () => {
    const result = renderDescripion(appDetailDataStub.data.description as string)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })
  test('renderDesktopIntegrationTypes - should match snapshot', () => {
    const result = renderDesktopIntegrationTypes(integrationTypesStub.data as DesktopIntegrationTypeModel[])
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })
  test('renderExtraMedia - should match snapshot', () => {
    const result = renderExtraMedia(appDetailDataStub.data.media)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })
  test('renderPermissions - should match snapshot', () => {
    const result = renderPermissions(appDetailDataStub.data.scopes)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })
  test('AppContent - should match snapshot', () => {
    const wrapper = shallow(
      <AppContent
        appDetailData={appDetailDataStub as AppDetailDataNotNull}
        desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
