import React, { useEffect, useState, Dispatch, SetStateAction, FC } from 'react'
import {
  Button,
  elMb11,
  FormLayout,
  InputGroup,
  InputWrap,
  PersistentNotification,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableRowContainer,
} from '@reapit/elements'
import dayjs from 'dayjs'
import FileSaver from 'file-saver'
import { PageContainer, Title } from '@reapit/elements'
import { FetchError } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { fetchTrafficPeriod } from '../../services/traffic'

export interface SelectOption {
  label?: string
  value?: string
}

export interface TrafficFilters {
  month?: string
}

export const handleSaveFile = (trafficFile: Blob, filename: string) => () => {
  FileSaver.saveAs(trafficFile, filename)
}

export const handleDownloadTrafficPeriod =
  (setTrafficFile: Dispatch<SetStateAction<Blob | null>>, period?: string) => () => {
    const fetchBilling = async () => {
      if (!period) return

      try {
        const trafficFile = await fetchTrafficPeriod(period)

        if (!trafficFile || trafficFile instanceof FetchError) {
          throw trafficFile
        }
        setTrafficFile(trafficFile)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBilling()
  }

export const Traffic: FC = () => {
  const [trafficFilters, setTrafficFilters] = useState<TrafficFilters>()
  const [trafficFile, setTrafficFile] = useState<Blob | null>(null)

  const { register, handleSubmit } = useForm<TrafficFilters>({
    mode: 'onChange',
  })

  useEffect(handleDownloadTrafficPeriod(setTrafficFile, trafficFilters?.month), [trafficFilters])

  return (
    <PageContainer>
      <Title>Traffic</Title>
      <form onChange={handleSubmit(setTrafficFilters)}>
        <FormLayout className={elMb11}>
          <InputWrap>
            <InputGroup {...register('month')} label="Month" type="month" />
          </InputWrap>
        </FormLayout>
      </form>
      {trafficFile && trafficFilters?.month ? (
        <Table className={elMb11}>
          <TableHeadersRow>
            <TableHeader>Period</TableHeader>
            <TableHeader>Download Traffic</TableHeader>
          </TableHeadersRow>
          <TableRowContainer>
            <TableRow>
              <TableCell>{dayjs(trafficFilters.month).format('MMMM YYYY')}</TableCell>
              <TableCell>
                <Button
                  intent="low"
                  onClick={handleSaveFile(trafficFile, `traffic-events-period-${trafficFilters.month}.csv`)}
                >
                  Download
                </Button>
              </TableCell>
            </TableRow>
          </TableRowContainer>
        </Table>
      ) : (
        <PersistentNotification intent="secondary" isExpanded={true} isInline isFullWidth>
          No traffic file available for download.
        </PersistentNotification>
      )}
    </PageContainer>
  )
}

export default Traffic
