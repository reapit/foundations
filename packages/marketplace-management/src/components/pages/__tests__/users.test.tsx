import * as React from 'react'
import { handleDocs, UsersPage } from '../users'
import { render } from '@testing-library/react'
import { Router, Switch } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import Routes from '../../../constants/routes'
import { GLOSSARY_USER_ROLES_URL } from '../../../constants/api'

jest.mock('../../../utils/use-org-id')

export const history: History<any> = createBrowserHistory()

describe('UsersPage', () => {
  it('should match a snapshot for the users tab', () => {
    history.push(Routes.USERS)
    expect(
      render(
        <Router history={history}>
          <Switch>
            <UsersPage />
          </Switch>
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the users groups tab', () => {
    history.push(Routes.USERS_GROUPS)
    expect(
      render(
        <Router history={history}>
          <Switch>
            <UsersPage />
          </Switch>
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleDocs', () => {
  it('should navigate correctly in desktop mode', () => {
    const curried = handleDocs(true)
    curried()

    expect(window.location.href).toEqual(`agencycloud://process/webpage?url=${GLOSSARY_USER_ROLES_URL}`)
  })

  it('should navigate correctly in web mode', () => {
    const navSpy = jest.spyOn(window, 'open')
    const curried = handleDocs(false)
    curried()

    expect(navSpy).toHaveBeenCalledWith(GLOSSARY_USER_ROLES_URL, '_blank')
  })
})
