import React from 'react'
import { Control, UseFormGetValues } from 'react-hook-form'
import Routes from '../../../../constants/routes'
import { render } from '../../../../tests/react-testing'
import { AppEditTabs } from '../edit-page-tabs'
import { AppEditFormSchema, defaultValues } from '../form-schema/form-fields'
import { createBrowserHistory, History } from 'history'
import { Router } from 'react-router'

jest.mock('../../state/use-app-state')

jest.mock('react-hook-form', () => ({
  Controller: ({ children }) => <div>{children}</div>,
  useWatch: jest.fn(),
}))

const history: History<any> = createBrowserHistory()

describe('AppEditTabs', () => {
  it('should match a snapshot for the authentication tab', () => {
    history.push(Routes.APPS_EDIT_AUTHENTICATION)
    expect(
      render(
        <Router history={history}>
          <AppEditTabs
            register={jest.fn()}
            errors={{}}
            control={{} as Control<AppEditFormSchema, object>}
            getValues={jest.fn()}
          />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the permissions tab', () => {
    history.push(Routes.APPS_EDIT_PERMISSIONS)
    expect(
      render(
        <Router history={history}>
          <AppEditTabs
            register={jest.fn()}
            errors={{}}
            control={{} as Control<AppEditFormSchema, object>}
            getValues={jest.fn()}
          />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the app listing tab', () => {
    history.push(Routes.APPS_EDIT_APP_LISTING)
    expect(
      render(
        <Router history={history}>
          <AppEditTabs
            register={jest.fn()}
            errors={{}}
            control={{} as Control<AppEditFormSchema, object>}
            getValues={jest.fn(() => defaultValues) as unknown as UseFormGetValues<AppEditFormSchema>}
          />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the ac integration tab', () => {
    history.push(Routes.APPS_EDIT_AC_INTEGRATION)
    expect(
      render(
        <Router history={history}>
          <AppEditTabs
            register={jest.fn()}
            errors={{}}
            control={{} as Control<AppEditFormSchema, object>}
            getValues={jest.fn()}
          />
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the general tab', () => {
    history.push(Routes.APPS_EDIT_GENERAL)
    expect(
      render(
        <Router history={history}>
          <AppEditTabs
            register={jest.fn()}
            errors={{}}
            control={{} as Control<AppEditFormSchema, object>}
            getValues={jest.fn(() => defaultValues) as unknown as UseFormGetValues<AppEditFormSchema>}
          />
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})
