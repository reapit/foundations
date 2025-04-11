import { render } from '@testing-library/react'
import React from 'react'
import { AppOptionsContent } from '../app-options-content'
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

const steps = [
  {
    text: 'Reapit CRM Functionality',
    nextStep: AppNewStepId.agencyCloudStep,
    authFlow: 'authorisationCode',
  },
  {
    text: 'Create an External Web Application',
    nextStep: AppNewStepId.externalAppStep,
    authFlow: 'clientCredentials',
  },
  {
    text: 'Data / Portal / Reporting Feed',
    nextStep: AppNewStepId.dataFeedStep,
    authFlow: 'clientCredentials',
  },
  {
    text: 'Website Feed',
    nextStep: AppNewStepId.websiteFeedStep,
    authFlow: 'clientCredentials',
  },
  {
    text: 'WebServices to Platform',
    nextStep: AppNewStepId.webServicesStep,
    authFlow: 'clientCredentials',
  },
  {
    text: 'Reapit Connect as ID Provider',
    nextStep: AppNewStepId.reapitConnectStep,
    authFlow: 'authorisationCode',
  },
  {
    text: 'Client Side App',
    nextStep: AppNewStepId.clientSideStep,
    authFlow: 'authorisationCode',
  },
  {
    text: 'Server Side Integration',
    nextStep: AppNewStepId.serverSideStep,
    authFlow: 'clientCredentials',
  },
]

describe('AppOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<AppOptionsContent />)).toMatchSnapshot()
  })

  steps.forEach(({ text, nextStep, authFlow }, index) => {
    it(`should handle next step on selection of step ${text}`, async () => {
      const rendered = render(<AppOptionsContent />)
      const item = await rendered.findByText(text)

      item.click()

      expect(mockSetAppWizardState.mock.calls[index][0]()).toEqual({
        nextStep,
        authFlow,
      })
    })
  })
})
