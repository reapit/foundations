import { render } from '@testing-library/react'
import React from 'react'
import { AppTypeOptionsContent } from '../app-type-options-content'
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

describe('AppTypeOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<AppTypeOptionsContent />)).toMatchSnapshot()
  })

  it('should handle next step on selection of an item', async () => {
    const rendered = render(<AppTypeOptionsContent />)
    const item = await rendered.findByText('Replace an AgencyCloud Screen')

    item.click()

    expect(mockSetAppWizardState.mock.calls[0][0]()).toEqual({ nextStep: AppNewStepId.agencyCloudReplacementStep })
  })
})
