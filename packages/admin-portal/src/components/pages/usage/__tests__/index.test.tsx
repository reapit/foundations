import { render } from '@testing-library/react'
import React from 'react'
import { UsagePage } from '../index'

// const mockSetAppWizardState = jest.fn()

// jest.mock('../use-app-wizard', () => ({
//   useAppWizard: () => ({
//     setAppWizardState: mockSetAppWizardState,
//     appWizardState: {
//       nextStep: 'agencyCloudStep',
//     },
//   }),
// }))

describe('UsagePage', () => {
  it('should match a snapshot', () => {
    expect(render(<UsagePage />)).toMatchSnapshot()
  })
})
