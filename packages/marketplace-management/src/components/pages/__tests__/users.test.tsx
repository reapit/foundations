import * as React from 'react'
import { handleDocs, UsersPage } from '../users'
import Routes from '../../../constants/routes'
import { GLOSSARY_USER_ROLES_URL } from '../../../constants/api'
import { render } from '../../../tests/react-testing'

jest.mock('../../../utils/use-org-id')

describe('UsersPage', () => {
  it('should match a snapshot for the users tab', () => {
    window.location.pathname = Routes.USERS
    expect(render(<UsersPage />)).toMatchSnapshot()
  })

  it('should match a snapshot for the users groups tab', () => {
    window.location.pathname = Routes.USERS_GROUPS
    expect(render(<UsersPage />)).toMatchSnapshot()
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
