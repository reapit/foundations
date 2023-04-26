import * as React from 'react'
import OfficesPage, { handleDocs } from '../offices'
import Routes from '../../../constants/routes'
import { OFFICE_GROUPS_DOCS_URL } from '../../../constants/api'
import { render } from '../../../tests/react-testing'

jest.mock('../../../utils/use-org-id')
jest.mock('../../ui/offices/office-group-create', () => () => <div />)
jest.mock('../../ui/offices/offices-groups-tab', () => () => <div />)

describe('OfficesPage', () => {
  it('should match a snapshot for the offices tab', () => {
    window.location.pathname = Routes.OFFICES
    expect(render(<OfficesPage />)).toMatchSnapshot()
  })

  it('should match a snapshot for the office groups tab', () => {
    window.location.pathname = Routes.OFFICES_GROUPS
    expect(render(<OfficesPage />)).toMatchSnapshot()
  })

  it('should match a snapshot for the office new tab', () => {
    window.location.pathname = Routes.OFFICES_GROUPS_NEW
    expect(render(<OfficesPage />)).toMatchSnapshot()
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
