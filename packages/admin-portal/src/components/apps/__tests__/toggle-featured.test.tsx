import React from 'react'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { handleRefreshAppsFeatured, handleToggleFeatured, ToggleFeatured, ToggleFeaturedForm } from '../toggle-featured'
import { render } from '../../../tests/react-testing'

describe('ToggleFeatured', () => {
  it('should match a snapshot with apps', () => {
    expect(
      render(<ToggleFeatured appIdFeatured="MOCK_ID" apps={mockAppSummaryModelPagedResult} appsRefresh={jest.fn()} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with no apps', () => {
    expect(render(<ToggleFeatured appIdFeatured="MOCK_ID" apps={null} appsRefresh={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleToggleFeatured', () => {
  it('handleToggleFeatured should correctly toggle an app as featured', () => {
    const featureApp = jest.fn()
    const unFeatureApp = jest.fn()
    const formValues = { isFeatured: 'FEATURED' } as ToggleFeaturedForm

    const curried = handleToggleFeatured(featureApp, unFeatureApp)

    curried(formValues)

    expect(featureApp).toHaveBeenCalledTimes(1)
    expect(unFeatureApp).not.toHaveBeenCalled()
  })

  it('handleToggleFeatured should correctly toggle an app as unfeatured', () => {
    const featureApp = jest.fn()
    const unFeatureApp = jest.fn()
    const formValues = { isFeatured: 'NOT_FEATURED' } as ToggleFeaturedForm

    const curried = handleToggleFeatured(featureApp, unFeatureApp)

    curried(formValues)

    expect(featureApp).not.toHaveBeenCalled()
    expect(unFeatureApp).toHaveBeenCalledTimes(1)
  })
})

describe('handleRefreshAppsFeatured', () => {
  it('handleRefreshAppsFeatured should correctly refresh featured apps', () => {
    const appsRefresh = jest.fn()
    const shouldRefresh = true

    const curried = handleRefreshAppsFeatured(appsRefresh, shouldRefresh)

    curried()

    expect(appsRefresh).toHaveBeenCalledTimes(1)
  })
})
