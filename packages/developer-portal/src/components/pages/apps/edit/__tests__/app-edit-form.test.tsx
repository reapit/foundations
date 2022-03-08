import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppEditForm, handleSetAppSubmitting, handleSetTabsState } from '../app-edit-form'
import { AppEditTab } from '../edit-page-tabs'
import { History } from 'history'
import { defaultValues } from '../form-schema/form-fields'
import { formatFormValues } from '../../utils/format-form-values'
import Routes from '../../../../../constants/routes'

jest.mock('../../state/use-app-state')

describe('AppEditForm', () => {
  it('should match a snapshot', () => {
    expect(render(<AppEditForm tab={AppEditTab.permissions} />)).toMatchSnapshot()
  })
})

describe('handleSetAppSubmitting', () => {
  it('should set appEditSaving', async () => {
    const mockSubmitHandler = jest.fn()
    const setAppEditSaving = jest.fn()
    const appEditSaving = true
    const handleSubmit = jest.fn(() => mockSubmitHandler)
    const createAppRevision = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const appsRefresh = jest.fn()
    const appsDetailRefresh = jest.fn()
    const history = {
      push: jest.fn(),
    } as unknown as History
    const appId = 'MOCK_ID'

    const curried = handleSetAppSubmitting(
      setAppEditSaving,
      appEditSaving,
      handleSubmit,
      createAppRevision,
      history,
      appId,
      appsRefresh,
      appsDetailRefresh,
    )

    curried()

    expect(mockSubmitHandler).toHaveBeenCalledTimes(1)

    await (handleSubmit.mock.calls[0] as any)[0](defaultValues)

    expect(createAppRevision).toHaveBeenCalledWith(formatFormValues(defaultValues))
    expect(setAppEditSaving).toHaveBeenCalledWith(false)
    expect(history.push).toHaveBeenCalledWith(`${Routes.APPS}/${appId}`)
    expect(appsRefresh).toHaveBeenCalledTimes(1)
    expect(appsDetailRefresh).toHaveBeenCalledTimes(1)
  })
})

describe('handleSetTabsState', () => {
  it('should set tabs state if agencyCloudIntegrated', async () => {
    const setAppTabsState = jest.fn()
    const getValues = jest.fn()
    const isCompletingListing = true
    const isAgencyCloudIntegrated = true
    const isListed = true

    const curried = handleSetTabsState(
      setAppTabsState,
      getValues,
      isCompletingListing,
      isAgencyCloudIntegrated,
      isListed,
    )

    curried()

    expect(setAppTabsState.mock.calls[0][0]()).toEqual({ isAgencyCloudIntegrated: true })
  })

  it('should set tabs state if isCompletingListing', async () => {
    const setAppTabsState = jest.fn()
    const getValues = jest.fn(() => defaultValues) as any
    const isCompletingListing = true
    const isAgencyCloudIntegrated = undefined as any
    const isListed = true

    const curried = handleSetTabsState(
      setAppTabsState,
      getValues,
      isCompletingListing,
      isAgencyCloudIntegrated,
      isListed,
    )

    curried()

    expect(setAppTabsState.mock.calls[0][0]()).toEqual({ isCompletingListing: true })
  })

  it('should set tabs state if isListed', async () => {
    const setAppTabsState = jest.fn()
    const getValues = jest.fn(() => defaultValues) as any
    const isCompletingListing = undefined as any
    const isAgencyCloudIntegrated = undefined as any
    const isListed = true

    const curried = handleSetTabsState(
      setAppTabsState,
      getValues,
      isCompletingListing,
      isAgencyCloudIntegrated,
      isListed,
    )

    curried()

    expect(setAppTabsState.mock.calls[0][0]()).toEqual({ isListed: true })
  })

  it('should not tabs state if no values are true', async () => {
    const setAppTabsState = jest.fn()
    const getValues = jest.fn(() => defaultValues) as any
    const isCompletingListing = undefined as any
    const isAgencyCloudIntegrated = undefined as any
    const isListed = undefined as any

    const curried = handleSetTabsState(
      setAppTabsState,
      getValues,
      isCompletingListing,
      isAgencyCloudIntegrated,
      isListed,
    )

    curried()

    expect(setAppTabsState.mock.calls[0][0]()).toBeUndefined()
  })
})
