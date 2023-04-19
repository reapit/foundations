import React from 'react'
import { DeepMap, FieldError, UseFormGetValues } from 'react-hook-form'
import { CreateAppFormSchema } from '..'
import { handleSetOptions, PermissionsOptionsContent, prepareOptions } from '../permissions-options-content'
import { render } from '../../../../tests/react-testing'

const mockSetAppWizardState = jest.fn()

jest.mock('../../state/use-app-state', () => ({
  useAppState: () => ({
    appWizardState: {
      currentStep: 'websiteFeedStep',
    },
    setAppWizardState: mockSetAppWizardState,
  }),
}))

const getValues = jest.fn(() => ({
  scopes: 'some-scope',
  redirectUris: 'some-redirect-uri',
  logoutUris: 'some-logout-uri',
})) as unknown as UseFormGetValues<CreateAppFormSchema>

const errors = {
  scopes: {
    message: 'Some error',
  },
} as DeepMap<Partial<CreateAppFormSchema>, FieldError>

describe('PermissionsOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(
      render(<PermissionsOptionsContent register={jest.fn()} getValues={getValues} errors={errors} />),
    ).toMatchSnapshot()
  })

  it('should handle last step on render', () => {
    render(<PermissionsOptionsContent register={jest.fn()} getValues={getValues} errors={errors} />)

    expect(mockSetAppWizardState.mock.calls[0][0]()).toEqual({
      lastStep: true,
    })
  })

  it('should handle setting options', () => {
    const defaultScopes = ['agencyCloud/applicants.read']
    const permissions = [
      {
        name: 'agencyCloud/applicants.read',
        description: 'Some description',
      },
      {
        name: 'agencyCloud/applicants.write',
        description: 'Some other description',
      },
    ]
    const search = 'other'
    const setOptions = jest.fn()
    const getValues = jest.fn(() => ({
      scopes: undefined,
    })) as unknown as UseFormGetValues<CreateAppFormSchema>

    const curried = handleSetOptions(defaultScopes, permissions, search, setOptions, getValues)

    curried()

    expect(setOptions).toHaveBeenCalledWith(prepareOptions(permissions))
  })
})
