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
import { fetchDeveloperBillingPeriod } from '../../services/developers'
import dayjs from 'dayjs'
import FileSaver from 'file-saver'
import { PageContainer, Title } from '@reapit/elements'
import { FetchError } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'

export interface SelectOption {
  label?: string
  value?: string
}

export interface InstallationFilters {
  month?: string
}

export const handleSaveFile = (billingFile: Blob, filename: string) => () => {
  FileSaver.saveAs(billingFile, filename)
}

export const handleDownloadBillingPeriod =
  (setBillingFile: Dispatch<SetStateAction<Blob | null>>, period?: string) => () => {
    const fetchBilling = async () => {
      if (!period) return

      try {
        const billingFile = await fetchDeveloperBillingPeriod({ period })

        if (!billingFile || billingFile instanceof FetchError) {
          throw billingFile
        }
        setBillingFile(billingFile)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBilling()
  }

export const AdminBilling: FC = () => {
  const [installationsFilters, setInstallationsFilters] = useState<InstallationFilters>()
  const [billingFile, setBillingFile] = useState<Blob | null>(null)

  const { register, handleSubmit } = useForm<InstallationFilters>({
    mode: 'onChange',
  })

  useEffect(handleDownloadBillingPeriod(setBillingFile, installationsFilters?.month), [installationsFilters])

  return (
    <PageContainer>
      <Title>Billing</Title>
      <form onChange={handleSubmit(setInstallationsFilters)}>
        <FormLayout className={elMb11}>
          <InputWrap>
            <InputGroup {...register('month')} label="Month" type="month" />
          </InputWrap>
        </FormLayout>
      </form>
      {billingFile && installationsFilters?.month ? (
        <Table className={elMb11}>
          <TableHeadersRow>
            <TableHeader>Period</TableHeader>
            <TableHeader>Download Billing</TableHeader>
          </TableHeadersRow>
          <TableRowContainer>
            <TableRow>
              <TableCell>{dayjs(installationsFilters.month).format('MMMM YYYY')}</TableCell>
              <TableCell>
                <Button
                  intent="low"
                  onClick={handleSaveFile(billingFile, `billing-developer-period-${installationsFilters.month}.csv`)}
                >
                  Download
                </Button>
              </TableCell>
            </TableRow>
          </TableRowContainer>
        </Table>
      ) : (
        <PersistentNotification intent="secondary" isExpanded={true} isInline isFullWidth>
          No billing file available for download.
        </PersistentNotification>
      )}
    </PageContainer>
  )
}

export default AdminBilling
