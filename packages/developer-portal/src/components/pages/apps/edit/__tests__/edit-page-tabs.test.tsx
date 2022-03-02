import React from 'react'
import { Control, UseFormGetValues } from 'react-hook-form'
import { render } from '../../../../../tests/react-testing'
import { AppEditTab, AppEditTabs } from '../edit-page-tabs'
import { AppEditFormSchema, defaultValues } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')

jest.mock('react-hook-form', () => ({
  Controller: ({ children }) => <div>{children}</div>,
}))

describe('AppEditTabs', () => {
  it('should match a snapshot for the pipleines tab', () => {
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.pipelines}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the authentication tab', () => {
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.authentication}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the permissions tab', () => {
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.permissions}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the app listing tab', () => {
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.appListing}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn(() => defaultValues) as unknown as UseFormGetValues<AppEditFormSchema>}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the ac integration tab', () => {
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.acIntegration}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the general tab', () => {
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.general}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn(() => defaultValues) as unknown as UseFormGetValues<AppEditFormSchema>}
        />,
      ),
    ).toMatchSnapshot()
  })
})
