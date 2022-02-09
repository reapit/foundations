import { render } from '@testing-library/react'
import React from 'react'
import { StepOptionsContent } from '../step-options-content'
import { AppNewStepId } from '../config'
import { DeepMap, FieldError, UseFormGetValues } from 'react-hook-form'
import { CreateAppFormSchema } from '../apps-new'

const mockUseAppWizard = jest.fn()

jest.mock('../use-app-wizard', () => ({
  useAppWizard: jest.fn(() => ({
    setAppWizardState: mockUseAppWizard,
    appWizardState: {
      currentStep: 'agencyCloudStep',
    },
  })),
}))

const errors = {
  redirectUris: {
    message: 'Some error',
  },
  signoutUris: {
    message: 'Some error',
  },
} as DeepMap<Partial<CreateAppFormSchema>, FieldError>

const getValues = jest.fn(() => ({
  scopes: 'some-scope',
  redirectUris: 'some-redirect-uri',
  logoutUris: 'some-logout-uri',
})) as unknown as UseFormGetValues<CreateAppFormSchema>

const steps = [
  AppNewStepId.webServicesStep,
  AppNewStepId.reapitConnectStep,
  AppNewStepId.otherAppStep,
  AppNewStepId.agencyCloudStep,
  AppNewStepId.dataFeedStep,
  AppNewStepId.serverSideStep,
  AppNewStepId.clientSideStep,
  AppNewStepId.websiteFeedStep,
  AppNewStepId.permissionsStep,
]

describe('StepOptionsContent', () => {
  steps.forEach((step) => {
    it('should match a snapshot', () => {
      mockUseAppWizard.mockReturnValue({
        appWizardState: {
          currentStep: step,
        },
      })
      expect(
        render(<StepOptionsContent register={jest.fn()} getValues={getValues} errors={errors} />),
      ).toMatchSnapshot()
    })
  })
})
