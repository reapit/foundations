import { render } from '@testing-library/react'
import React from 'react'
import { UseFormGetValues } from 'react-hook-form'
import { CreateAppFormSchema } from '../apps-new'
import { handleSetOptions, PermissionsOptionsContent, prepareOptions } from '../permissions-options-content'

const mockSetAppWizardState = jest.fn()

jest.mock('../use-app-wizard', () => ({
  useAppWizard: () => ({
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

describe('PermissionsOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<PermissionsOptionsContent register={jest.fn()} getValues={getValues} />)).toMatchSnapshot()
  })

  it('should handle last step on render', () => {
    render(<PermissionsOptionsContent register={jest.fn()} getValues={getValues} />)

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
