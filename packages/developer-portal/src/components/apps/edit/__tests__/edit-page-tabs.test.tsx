import React from 'react'
import { Control, UseFormGetValues } from 'react-hook-form'
import Routes from '../../../../constants/routes'
import { render } from '../../../../tests/react-testing'
import { AppEditTabs } from '../edit-page-tabs'
import { AppEditFormSchema, defaultValues } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')

jest.mock('react-hook-form', () => ({
  Controller: ({ children }) => <div>{children}</div>,
  useWatch: jest.fn(),
}))

describe('AppEditTabs', () => {
  it('should match a snapshot for the authentication tab', () => {
    window.location.pathname = Routes.APPS_EDIT_AUTHENTICATION
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the permissions tab', () => {
    window.location.pathname = Routes.APPS_EDIT_PERMISSIONS
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the app listing tab', () => {
    window.location.pathname = Routes.APPS_EDIT_APP_LISTING
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn(() => defaultValues) as unknown as UseFormGetValues<AppEditFormSchema>}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the ac integration tab', () => {
    window.location.pathname = Routes.APPS_EDIT_AC_INTEGRATION
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the general tab', () => {
    window.location.pathname = Routes.APPS_EDIT_GENERAL
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn(() => defaultValues) as unknown as UseFormGetValues<AppEditFormSchema>}
        />,
      ),
    ).toMatchSnapshot()
  })
})
