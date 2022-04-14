import React, { ChangeEvent } from 'react'
import { ApiPage, handleChangeSwaggerDoc, handleDefaultSwaggerDoc } from '../api-page'
import { render } from '../../../tests/react-testing'
import Routes from '../../../constants/routes'
import { ReapitConnectSession } from '@reapit/connect-session'
import { mockProductModelPagedResult } from '../../../tests/__stubs__/products'
import { ProductModel } from '@reapit/foundations-ts-definitions'

jest.mock('../../webhooks/state/use-webhooks-state')

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
    const connectSession = {
      loginIdentity: {
        orgProduct: 'agencyCloud',
      },
    } as unknown as ReapitConnectSession

    const curried = handleDefaultSwaggerDoc(setSwaggerUri, productsList, connectSession)

    curried()

    expect(setSwaggerUri).toBeCalledWith((mockProductModelPagedResult.data as ProductModel[])[0].openApiUrl)
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
