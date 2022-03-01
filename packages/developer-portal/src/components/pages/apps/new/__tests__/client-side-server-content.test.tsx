import { render } from '@testing-library/react'
import React from 'react'
import { ClientServerSideContent } from '../client-server-side-content'
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
    text: 'Client Side',
    nextStep: AppNewStepId.clientSideStep,
    authFlow: 'authorisationCode',
  },
  {
    text: 'Server Side',
    nextStep: AppNewStepId.serverSideStep,
    authFlow: 'clientCredentials',
  },
]

describe('ClientServerSideContent', () => {
  it('should match a snapshot', () => {
    expect(render(<ClientServerSideContent />)).toMatchSnapshot()
  })

  steps.forEach(({ text, nextStep, authFlow }, index) => {
    it(`should handle next step on selection of step ${text}`, async () => {
      const rendered = render(<ClientServerSideContent />)
      const item = await rendered.findByText(text)

      item.click()

      expect(mockSetAppWizardState.mock.calls[index][0]()).toEqual({
        nextStep,
        authFlow,
      })
    })
  })
})
