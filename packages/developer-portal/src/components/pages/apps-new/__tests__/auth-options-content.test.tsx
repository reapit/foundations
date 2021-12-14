import { render } from '@testing-library/react'
import React from 'react'
import { AuthOptionsContent } from '../auth-options-content'
import { AppNewStepId } from '../config'

const mockSetAppWizardState = jest.fn()

jest.mock('../use-app-wizard', () => ({
  useAppWizard: () => ({
    setAppWizardState: mockSetAppWizardState,
    appWizardState: {
      nextStep: 'agencyCloudStep',
    },
  }),
}))

describe('AuthOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<AuthOptionsContent />)).toMatchSnapshot()
  })

  it('should handle next step on render', async () => {
    render(<AuthOptionsContent />)

    expect(mockSetAppWizardState.mock.calls[0][0]()).toEqual({ nextStep: AppNewStepId.permissionsStep })
  })
})
