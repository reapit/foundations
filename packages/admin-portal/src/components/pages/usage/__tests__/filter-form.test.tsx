import { render } from '@testing-library/react'
import React from 'react'
import { appsDataStub, installationsStub } from '../../../../sagas/apps/__stubs__/apps'
import { FilterForm } from '../filter-form'

// const mockSetAppWizardState = jest.fn()

// jest.mock('../use-app-wizard', () => ({
//   useAppWizard: () => ({
//     setAppWizardState: mockSetAppWizardState,
//     appWizardState: {
//       nextStep: 'agencyCloudStep',
//     },
//   }),
// }))

describe('FilterForm', () => {
  it('should match a snapshot with no filter options', () => {
    const setUsageFilters = jest.fn()
    expect(render(<FilterForm setUsageFilters={setUsageFilters} apps={null} installations={null} />)).toMatchSnapshot()
  })

  it('should match a snapshot with filter options', () => {
    const setUsageFilters = jest.fn()
    expect(
      render(
        <FilterForm setUsageFilters={setUsageFilters} apps={appsDataStub.data} installations={installationsStub} />,
      ),
    ).toMatchSnapshot()
  })
})
