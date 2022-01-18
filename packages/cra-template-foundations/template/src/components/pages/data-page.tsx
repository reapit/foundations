import React, { useEffect, FC, useState } from 'react'
import {
  Title,
  Subtitle,
  Button,
  elHFull,
  elMb5,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
  Loader,
  Table,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { configurationAppointmentsApiService } from '../../platform-api/configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { openNewPage } from '../../utils/navigation'

export const DataPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appointmentConfigTypes, setAppointmentConfigTypes] = useState<ListItemModel[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchAppoinmentConfigs = async () => {
      setLoading(true)
      const serviceResponse = await configurationAppointmentsApiService(connectSession)

      if (serviceResponse) {
        setAppointmentConfigTypes(serviceResponse)
      }
      setLoading(false)
    }

    if (connectSession) {
      fetchAppoinmentConfigs()
    }
  }, [connectSession])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Data</Title>
        <Icon className={elMb5} icon="webhooksInfographic" iconSize="large" />
        <Subtitle>Data Fetching</Subtitle>
        <SmallText hasGreyText>
          This simple example demonstrates how to fetch data from our Appointment Config service, authenticated with
          Reapit Connect using the Connect Session library. You can view the relevant docs below.
        </SmallText>
        <Button
          className={elMb5}
          intent="neutral"
          onClick={openNewPage('https://developers.reapit.cloud/api-docs/app-development/connect-session')}
        >
          Connect Session
        </Button>
        <Button
          className={elMb5}
          intent="neutral"
          onClick={openNewPage('https://developers.reapit.cloud/api-docs/api/api-documentation')}
        >
          REST API
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Appointment Config List</Title>
        {loading ? (
          <Loader label="loading" />
        ) : (
          <Table
            rows={appointmentConfigTypes.map(({ id, value }) => ({
              cells: [
                {
                  label: 'Config Id',
                  value: id ?? '',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Config Value',
                  value: value ?? '',
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
            }))}
          />
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default DataPage
