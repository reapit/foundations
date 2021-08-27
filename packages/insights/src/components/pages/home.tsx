import React, { ChangeEvent, Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import {
  Title,
  Loader,
  FlexContainer,
  PersistantNotification,
  PageContainer,
  elHFull,
  BodyText,
  Button,
  elMb5,
  Icon,
  Subtitle,
  Select,
  Label,
  elBorderRadius,
} from '@reapit/elements'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { ControlsContainer, MetabaseContainer } from './__styles__/styles'
import { embedPowerBi, PowerBIParams } from '../../utils/power-bi'
import { getInstalledReportsService, InstalledReport } from '../../platform-api/installed-reports'
import { SecondaryNavContainer } from '@reapit/elements'
import { InputGroup } from '@reapit/elements'
import { elWFull } from '../../../../elements/src/styles/sizing'

export const handleSelectReport =
  (setInstalledReports: Dispatch<SetStateAction<PowerBIParams | null>>, installedReports: InstalledReport[] | null) =>
  (event: ChangeEvent<HTMLSelectElement>) => {
    const report = installedReports?.find((report) => report.id === event.target.value)
    if (report) {
      const { token, id: reportId, embeddedUrl } = report
      const credentials: PowerBIParams = {
        reportId,
        embeddedUrl,
        token,
      }
      setInstalledReports(credentials)
    } else {
      setInstalledReports(null)
    }
  }

export const handleEmbedReport =
  (reportRef: MutableRefObject<HTMLDivElement | null>, selectedReport: PowerBIParams | null) => () => {
    if (reportRef.current && selectedReport) {
      embedPowerBi(selectedReport, reportRef)
    }
  }

export const handleInstalledReports =
  (
    connectSession: ReapitConnectSession | null,
    shouldFetchReports: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setInstalledReports: Dispatch<SetStateAction<InstalledReport[] | null>>,
  ) =>
  () => {
    if (connectSession && shouldFetchReports) {
      setLoading(true)
      const fetchInstalledReports = async () => {
        const installedReports = await getInstalledReportsService(connectSession as ReapitConnectSession)
        setLoading(false)
        setInstalledReports(installedReports ?? null)
      }

      fetchInstalledReports()
    }
  }

export const Home: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [selectedReport, setSelectedReport] = useState<PowerBIParams | null>(null)
  const [installedReports, setInstalledReports] = useState<InstalledReport[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const reportRef = useRef<HTMLDivElement | null>(null)
  const shouldFetchReports = !loading && !selectedReport && !installedReports

  useEffect(handleInstalledReports(connectSession, shouldFetchReports, setLoading, setInstalledReports), [
    connectSession,
    selectedReport,
    installedReports,
    loading,
  ])

  useEffect(handleEmbedReport(reportRef, selectedReport), [reportRef, selectedReport])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Reports</Title>
        <Icon className={elMb5} icon="apiInfographic" iconSize="large" />
        <Subtitle>Welcome</Subtitle>
        <BodyText hasGreyText>
          We have provided comprehensive documentation for the Insights Services. Please click below to view before
          getting started
        </BodyText>
        <Button className={elMb5} intent="neutral">
          View Docs
        </Button>
        <ControlsContainer className={elBorderRadius}>
          <InputGroup>
            <Select className={elWFull} onChange={handleSelectReport(setSelectedReport, installedReports)}>
              <option key="default-option">Please Select</option>
              {installedReports?.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </Select>
            <Label htmlFor="myId">Select Report</Label>
          </InputGroup>
        </ControlsContainer>
      </SecondaryNavContainer>
      <PageContainer>
        <Title>Reapit Insights</Title>
        {!selectedReport ? (
          <>
            <PersistantNotification isFullWidth isExpanded intent="secondary">
              {loading ? 'Loading your Power BI Reports.' : 'Please select a report from the left hand side menu'}
            </PersistantNotification>
            {loading && <Loader fullPage label="Loading" />}
          </>
        ) : (
          <FlexContainer className={elHFull} isFlexColumn>
            <MetabaseContainer id="reportContainer" ref={reportRef} />
          </FlexContainer>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default Home
