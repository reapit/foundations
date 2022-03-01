import React from 'react'
import { Control } from 'react-hook-form'
import { render } from '../../../../../tests/react-testing'
import { AppListingTab } from '../app-listing-tab'
import { AppEditTab } from '../edit-page-tabs'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')
jest.mock('react-hook-form', () => ({
  Controller: ({ children }) => <div>{children}</div>,
}))

describe('AppListingTab', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppListingTab
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.appListing}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
