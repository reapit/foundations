import React, { ChangeEvent } from 'react'
import { ApiPage, handleChangeSwaggerDoc, handleDefaultSwaggerDoc } from '../api-page'
import { render } from '../../../tests/react-testing'
import Routes from '../../../constants/routes'
import { mockProductModelPagedResult } from '../../../tests/__stubs__/products'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { mockMemberModel } from '../../../tests/__stubs__/members'
import { mockDeveloperModel } from '../../../tests/__stubs__/developers'

jest.mock('../../webhooks/state/use-webhooks-state')
jest.mock('../../../core/use-global-state')

const routes = [
  Routes.WEBHOOKS,
  Routes.WEBHOOKS_NEW,
  Routes.WEBHOOKS_MANAGE,
  Routes.WEBHOOKS_LOGS,
  Routes.WEBHOOKS_ABOUT,
  Routes.SWAGGER,
  Routes.GRAPHQL,
  Routes.DESKTOP,
]

describe('ApiPage', () => {
  process.env.swaggerWhitelist = [mockDeveloperModel.id as string]

  routes.forEach((route) => {
    it(`should match a snapshot for the ${route} page`, () => {
      window.location.pathname = route
      expect(render(<ApiPage />)).toMatchSnapshot()
    })
  })
})

describe('handleDefaultSwaggerDoc', () => {
  it('should set the swagger uri', () => {
    const setSwaggerUri = jest.fn()
    const productsList = mockProductModelPagedResult
    const currentMember = mockMemberModel

    const curried = handleDefaultSwaggerDoc(setSwaggerUri, productsList, currentMember)

    curried()

    expect(setSwaggerUri).toBeCalledWith((mockProductModelPagedResult.data as Marketplace.ProductModel[])[0].openApiUrl)
  })
})

describe('handleChangeSwaggerDoc', () => {
  it('should set the swagger uri', () => {
    const setSwaggerUri = jest.fn()
    const event = {
      target: {
        value: 'agencyCloud',
      },
    } as unknown as ChangeEvent<HTMLSelectElement>

    const curried = handleChangeSwaggerDoc(setSwaggerUri)

    curried(event)

    expect(setSwaggerUri).toBeCalledWith(event.target.value)
  })
})
