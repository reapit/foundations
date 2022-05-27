import * as React from 'react'
import { render } from '@testing-library/react'
import OfficesPage, { handleDocs } from '../offices'
import { Router, Switch } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import Routes from '../../../constants/routes'
import { OFFICE_GROUPS_DOCS_URL } from '../../../constants/api'

jest.mock('../../../utils/use-org-id')
jest.mock('../../ui/offices/office-group-create', () => () => <div />)
jest.mock('../../ui/offices/offices-groups-tab', () => () => <div />)

export const history: History<any> = createBrowserHistory()

describe('OfficesPage', () => {
  it('should match a snapshot for the offices tab', () => {
    history.push(Routes.OFFICES)
    expect(
      render(
        <Router history={history}>
          <Switch>
            <OfficesPage />
          </Switch>
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the office groups tab', () => {
    history.push(Routes.OFFICES_GROUPS)
    expect(
      render(
        <Router history={history}>
          <Switch>
            <OfficesPage />
          </Switch>
        </Router>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for the office new tab', () => {
    history.push(Routes.OFFICES_GROUPS_NEW)
    expect(
      render(
        <Router history={history}>
          <Switch>
            <OfficesPage />
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

    expect(window.location.href).toEqual(`agencycloud://process/webpage?url=${OFFICE_GROUPS_DOCS_URL}`)
  })

  it('should navigate correctly in web mode', () => {
    const navSpy = jest.spyOn(window, 'open')
    const curried = handleDocs(false)

    curried()

    expect(navSpy).toHaveBeenCalledWith(OFFICE_GROUPS_DOCS_URL, '_blank')
  })
})
