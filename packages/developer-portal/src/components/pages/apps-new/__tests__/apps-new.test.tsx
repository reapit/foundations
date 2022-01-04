import { render } from '@testing-library/react'
import React from 'react'
import { AppsNew } from '../apps-new'
import { AppWizardProvider } from '../use-app-wizard'

describe('AppsNew', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppWizardProvider>
          <AppsNew />
        </AppWizardProvider>,
      ),
    ).toMatchSnapshot()
  })

  it('should handle next step and previous step on button click', async () => {
    const rendered = render(
      <AppWizardProvider>
        <AppsNew />
      </AppWizardProvider>,
    )

    expect(rendered.queryByText('AgencyCloud Functionality')).toBeNull()
    const existingCustomer = await rendered.findByText('Existing Reapit Customer')
    existingCustomer.click()

    const nextButton = await rendered.findByText('Next')
    nextButton.click()

    const existingCustomerStep = await rendered.findByText('AgencyCloud Functionality')
    expect(existingCustomerStep).toBeDefined()
    expect(rendered.queryByText('Existing Reapit Customer')).toBeNull()

    const prevButton = await rendered.findByText('Prev')
    prevButton.click()

    expect(rendered.queryByText('AgencyCloud Functionality')).toBeNull()
    const previousExistingCustomer = await rendered.findByText('Existing Reapit Customer')
    expect(previousExistingCustomer).toBeDefined()
  })
})
