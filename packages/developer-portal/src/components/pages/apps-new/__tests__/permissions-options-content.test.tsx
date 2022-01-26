import { render } from '@testing-library/react'
import React from 'react'
import { PermissionsOptionsContent } from '../permissions-options-content'

jest.mock('../use-app-wizard', () => ({
  useAppWizard: () => ({
    appWizardState: {
      currentStep: 'websiteFeedStep',
    },
  }),
}))

describe('PermissionsOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<PermissionsOptionsContent />)).toMatchSnapshot()
  })
})
