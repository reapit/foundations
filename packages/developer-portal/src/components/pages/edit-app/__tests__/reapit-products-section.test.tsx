import React from 'react'
import { shallow } from 'enzyme'
import { ReapitProductsSection, ReapitProductsSectionProps } from '../reapit-products-section'
import { appDetailDataStub } from '../../../../sagas/__stubs__/app-detail'
import { AppDetailModel, ProductModelPagedResult } from '@reapit/foundations-ts-definitions'

const mockProps: ReapitProductsSectionProps = {
  app: appDetailDataStub.data as AppDetailModel,
}

const mockProductList = {
  _embedded: [
    {
      id: 'agencyCloud',
      name: 'Agency Cloud',
    },
    {
      id: 'agencyCloudAus',
      name: 'Agency Cloud Aus',
    },
  ],
} as ProductModelPagedResult

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: () => [mockProductList, false],
  GetActionNames: {
    getProducts: 'getProducts',
  },
}))

describe('ReapitProductsSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ReapitProductsSection {...mockProps} />)).toMatchSnapshot()
  })
})
