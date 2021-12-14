import { render } from '@testing-library/react'
import React from 'react'
import { UserOptionsContent } from '../user-options-content'
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

describe('UserOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<UserOptionsContent />)).toMatchSnapshot()
  })

  it('should handle next step on selection of an item', async () => {
    const rendered = render(<UserOptionsContent />)
    const item = await rendered.findByText('Existing Reapit Customer')

    item.click()

    expect(mockSetAppWizardState.mock.calls[0][0]()).toEqual({ nextStep: AppNewStepId.existingCustomerStep })
  })
})
