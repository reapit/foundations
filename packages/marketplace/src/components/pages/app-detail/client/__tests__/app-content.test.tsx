import React from 'react'
import AppContent, {
  renderCategory,
  renderDescripion,
  renderDesktopIntegrationTypes,
  renderExtraMedia,
  renderPermissions,
  renderDirectAPI,
} from '../client-app-content'

import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

import { shallow } from 'enzyme'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'

describe('AppContent', () => {
  it('renderCategory - should match snapshot', () => {
    const result = renderCategory(appDetailDataStub.data.category)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderDescripion - should match snapshot', () => {
    const result = renderDescripion(appDetailDataStub.data.description as string)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderDesktopIntegrationTypes - should match snapshot', () => {
    const result = renderDesktopIntegrationTypes(integrationTypesStub.data as DesktopIntegrationTypeModel[])
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderDirectAPI - should match snapshot two cases', () => {
    const result1 = renderDirectAPI(true)
    const wrapper1 = shallow(<div>{result1}</div>)
    expect(wrapper1).toMatchSnapshot()

    const result2 = renderDirectAPI(false)
    const wrapper2 = shallow(<div>{result2}</div>)
    expect(wrapper2).toMatchSnapshot()
  })

  it('renderExtraMedia - should match snapshot', () => {
    const result = renderExtraMedia(appDetailDataStub.data.media)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderPermissions - should match snapshot', () => {
    const result = renderPermissions(appDetailDataStub.data.scopes)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  it('AppContent - should match snapshot', () => {
    const wrapper = shallow(
      <AppContent
        appDetailData={appDetailDataStub as AppDetailDataNotNull}
        desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
