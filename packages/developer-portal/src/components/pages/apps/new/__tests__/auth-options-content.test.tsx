import { render } from '@testing-library/react'
import React from 'react'
import { DeepMap, FieldError } from 'react-hook-form'
import { CreateAppFormSchema } from '..'
import { AuthOptionsContent } from '../auth-options-content'
import { AppNewStepId } from '../config'

const mockSetAppWizardState = jest.fn()

jest.mock('../../state/use-app-state', () => ({
  useAppState: () => ({
    setAppWizardState: mockSetAppWizardState,
    appWizardState: {
      nextStep: 'agencyCloudStep',
    },
  }),
}))

describe('AuthOptionsContent', () => {
  const errors = {
    redirectUris: {
      message: 'Some error',
    },
    signoutUris: {
      message: 'Some error',
    },
  } as DeepMap<Partial<CreateAppFormSchema>, FieldError>

  it('should match a snapshot', () => {
    expect(render(<AuthOptionsContent register={jest.fn()} errors={errors} />)).toMatchSnapshot()
  })

  it('should handle next step on render', async () => {
    render(<AuthOptionsContent register={jest.fn()} errors={errors} />)

    expect(mockSetAppWizardState.mock.calls[0][0]()).toEqual({ nextStep: AppNewStepId.permissionsStep })
  })
})
