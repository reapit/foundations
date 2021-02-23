import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  H5,
  Grid,
  GridItem,
  Section,
  LevelRight,
  Button,
  FadeIn,
  Table,
  Formik,
  Form,
  DatePicker,
  DATE_TIME_FORMAT,
  Loader,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { unparse } from 'papaparse'
import FormikAutoSave from '../../hocs/formik-auto-save'
import { MessageContext } from '../../../context/message-context'
import {
  convertTableDataToArray,
  handleAutoSave,
  handleDownloadCSV,
  handleGetBilling,
  handleOnSave,
  prepareTableColumns,
  prepareTableData,
} from './analytics-handlers'

const AnalyticsCostExplorer: React.FC = () => {
  const [billing, setBilling] = useState<BillingBreakdownForMonthV2Model>()
  const [billingLoading, setBillingLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)
  const developerId = connectSession?.loginIdentity?.developerId ?? null
  const [month, setMonth] = useState<Date>(new Date())
  const onSave = useCallback(handleOnSave(setMonth), [])

  useEffect(handleGetBilling(setBilling, setBillingLoading, setMessageState, month), [developerId, month])

  const totalCost = billing?.totalCost || 0
  const columns = prepareTableColumns(billing)
  const tableData = prepareTableData(billing?.services ?? [])
  const parsableData = convertTableDataToArray(tableData, totalCost)
  const csvData = unparse(parsableData)

  return (
    <Section hasMargin={false}>
      <H5>Cost Explorer</H5>
      <p className="mb-4">
        <i>* Includes 2hrs free monthly usage</i>
      </p>
      <FadeIn>
        <Grid>
          <GridItem className="is-half-desktop">
            <Formik initialValues={{ month }} onSubmit={() => {}}>
              <Form>
                <DatePicker
                  id="month"
                  name="month"
                  useCustomInput={false}
                  reactDatePickerProps={{
                    showMonthYearPicker: true,
                    dateFormat: DATE_TIME_FORMAT.MMMM_YYYY,
                    showMonthDropdown: true,
                    minDate: new Date('2020-12-01'),
                    maxDate: new Date(),
                  }}
                />
                <FormikAutoSave onSave={handleAutoSave(onSave)} />
              </Form>
            </Formik>
          </GridItem>
          <GridItem className="is-half-desktop">
            <LevelRight className="has-text-right">
              <Button onClick={handleDownloadCSV(csvData)}>Download</Button>
            </LevelRight>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            {billingLoading ? <Loader /> : <Table bordered scrollable expandable columns={columns} data={tableData} />}
            <p className="mt-4">
              * All charges are subject to VAT. Your totals for each month will be sent to our Accounts Department and
              you will be automatically invoiced at the end of each billing period.
            </p>
            <p className="mt-4">
              ** Data warehouse uptime costs may take upwards of an hour to appear in the Cost Explorer
            </p>
            <p className="mt-4">*** Partially used hours are rounded upwards for the purposes of billing </p>
          </GridItem>
        </Grid>
      </FadeIn>
    </Section>
  )
}
export default AnalyticsCostExplorer
