import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppEditForm, handleSetAppSubmitting, handleSetRevalidating, handleUnsavedChanges } from '../app-edit-form'
import { AppEditTab } from '../edit-page-tabs'
import { History } from 'history'
import { AppEditFormSchema, defaultValues } from '../form-schema/form-fields'
import { formatFormValues } from '../../utils/format-form-values'
import Routes from '../../../../../constants/routes'
import { defaultAppSavingParams } from '../../state/defaults'
import { FieldNamesMarkedBoolean } from 'react-hook-form'

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
    const appEditSaving = {
      isListed: true,
      isRevalidating: true,
      isSaving: true,
    }
    const handleSubmit = jest.fn(() => mockSubmitHandler)
    const createAppRevision = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const appsRefresh = jest.fn()
    const appsDetailRefresh = jest.fn()
    const appRefreshRevisions = jest.fn()
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
      appRefreshRevisions,
    )

    curried()

    expect(mockSubmitHandler).toHaveBeenCalledTimes(1)

    await (handleSubmit.mock.calls[0] as any)[0](defaultValues)

    expect(createAppRevision).toHaveBeenCalledWith(formatFormValues(defaultValues))
    expect(setAppEditSaving).toHaveBeenCalledWith(defaultAppSavingParams)
    expect(history.push).toHaveBeenCalledWith(`${Routes.APPS}/${appId}`)
    expect(appsRefresh).toHaveBeenCalledTimes(1)
    expect(appsDetailRefresh).toHaveBeenCalledTimes(1)
    expect(appRefreshRevisions).toHaveBeenCalledTimes(1)
  })
})

describe('handleUnsavedChanges', () => {
  it('should set appEditSaving', async () => {
    const dirtyFields = {
      isListed: true,
    } as FieldNamesMarkedBoolean<AppEditFormSchema>
    const setAppUnsavedFields = jest.fn()

    const curried = handleUnsavedChanges(dirtyFields, setAppUnsavedFields)

    curried()

    expect(setAppUnsavedFields).toHaveBeenCalledWith(dirtyFields)
  })
})

describe('handleSetRevalidating', () => {
  it('should set appEditSaving', async () => {
    const setAppEditSaving = jest.fn()
    const appEditSaving = {
      isListed: true,
      isRevalidating: true,
      isSaving: true,
    }
    const setValue = jest.fn()

    const curried = handleSetRevalidating(setValue, setAppEditSaving, appEditSaving)

    curried()

    expect(setValue).toHaveBeenCalledWith('isListed', appEditSaving.isListed, { shouldValidate: true })
    expect(setAppEditSaving).toHaveBeenCalledWith({
      ...appEditSaving,
      isRevalidating: false,
      isSaving: true,
    })
  })
})
