import * as React from 'react'
import { render } from '../../../tests/react-testing'
import Home, { handleEmbedReport, handleInstalledReports, handleSelectReport } from '../home'
import { InstalledReport, getInstalledReportsService } from '../../../platform-api/installed-reports'
import { ChangeEvent, MutableRefObject } from 'react'
import { PowerBIParams, embedPowerBi } from '../../../utils/power-bi'
import { ReapitConnectSession } from '@reapit/connect-session'

jest.mock('../../../utils/power-bi', () => ({
  embedPowerBi: jest.fn(),
}))

jest.mock('../../../platform-api/installed-reports', () => ({
  getInstalledReportsService: jest.fn().mockReturnValue(true),
}))

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(render(<Home />)).toMatchSnapshot()
  })
})

describe('handleSelectReport', () => {
  it('should setInstalledReport with the report if found', () => {
    const mockReport = {
      id: 'SOME_ID',
      embeddedUrl: 'https://example.com',
      token: 'SOME_TOKEN',
    } as InstalledReport

    const { token, id: reportId, embeddedUrl } = mockReport

    const mockEvent = {
      target: { value: 'SOME_ID' },
    } as ChangeEvent<HTMLSelectElement>

    const mockSetInstalledReports = jest.fn()

    const curried = handleSelectReport(mockSetInstalledReports, [mockReport])

    curried(mockEvent)

    expect(mockSetInstalledReports).toHaveBeenCalledWith({ reportId, embeddedUrl, token })
  })

  it('should setInstalledReport with null if report not found', () => {
    const mockReport = {
      id: 'SOME_ID',
    } as InstalledReport

    const mockEvent = {
      target: { value: 'SOME_ID_THAT_CANT_BE_FOUND' },
    } as ChangeEvent<HTMLSelectElement>

    const mockSetInstalledReports = jest.fn()

    const curried = handleSelectReport(mockSetInstalledReports, [mockReport])

    curried(mockEvent)

    expect(mockSetInstalledReports).toHaveBeenCalledWith(null)
  })
})

describe('handleEmbedReport', () => {
  it('should correctly call embedPowerBi with a report and dom ref', () => {
    const mockReport = {
      reportId: 'SOME_ID',
      embeddedUrl: 'https://example.com',
      token: 'SOME_TOKEN',
    } as PowerBIParams

    const mockReportRef = {
      current: document.createElement('div'),
    } as MutableRefObject<HTMLDivElement | null>

    const curried = handleEmbedReport(mockReportRef, mockReport)

    curried()

    expect(embedPowerBi).toHaveBeenCalledWith(mockReport, mockReportRef)
  })

  it('should not call embedPowerBi if ref or report are not supplied', () => {
    const mockReport = null
    const mockReportRef = {
      current: null,
    } as MutableRefObject<HTMLDivElement | null>

    const curried = handleEmbedReport(mockReportRef, mockReport)

    curried()

    expect(embedPowerBi).not.toHaveBeenCalled()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('handleInstalledReports', () => {
  it('should setInstalledReport with the report if found', async () => {
    const mockSession = {} as ReapitConnectSession
    const mockSetLoading = jest.fn()
    const mockSetInstalledReports = jest.fn()

    const curried = handleInstalledReports(mockSession, true, mockSetLoading, mockSetInstalledReports)

    await curried()

    expect(mockSetLoading).toHaveBeenCalledWith(true)
    expect(mockSetLoading).toHaveBeenLastCalledWith(false)
    expect(getInstalledReportsService).toHaveBeenCalledWith(mockSession)
    expect(mockSetInstalledReports).toHaveBeenCalledTimes(1)
  })

  it('should not call handlers if connectSession or shouldFetchReports are falsy', async () => {
    const mockSession = null
    const mockSetLoading = jest.fn()
    const mockSetInstalledReports = jest.fn()

    const curried = handleInstalledReports(mockSession, false, mockSetLoading, mockSetInstalledReports)

    await curried()

    expect(mockSetLoading).not.toHaveBeenCalled()
    expect(getInstalledReportsService).not.toHaveBeenCalled()
    expect(mockSetInstalledReports).not.toHaveBeenCalled()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
