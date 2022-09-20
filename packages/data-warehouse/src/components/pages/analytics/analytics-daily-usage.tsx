import * as React from 'react'
import { Section, H5, FadeIn, DATE_TIME_FORMAT, Loader, Formik, DatePicker, Form } from '@reapit/elements-legacy'
import ErrorBoundary from '../../hocs/error-boundary'
import { Line } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  getAppHttpTrafficPerDayChartData,
  getDailyChartConfig,
  getDailyChartOptions,
  handleAutoSave,
  handleGetBilling,
  handleOnSave,
} from './analytics-handlers'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { MessageContext } from '../../../context/message-context'
import { StatsContainer } from './__styles__/analytics'
import FormikAutoSave from '../../hocs/formik-auto-save'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'

export const AnalyticsDailyUsage: React.FC = () => {
  const [billing, setBilling] = useState<BillingBreakdownForMonthV2Model>()
  const [billingLoading, setBillingLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)
  const [month, setMonth] = useState<Date>(new Date())
  const developerId = connectSession?.loginIdentity?.developerId ?? null
  const onSave = useCallback(handleOnSave(setMonth), [])
  const dwService = billing?.services?.find((service) => service.name === 'Data Warehouse')
  const appHttpTrafficPerDayChartData = getAppHttpTrafficPerDayChartData((dwService && dwService?.items) ?? [])

  const { labels, data, chartDataStats } = appHttpTrafficPerDayChartData
  const chartData = getDailyChartConfig(labels, data) as ChartData<'line', number[], string>
  const chartOptions = getDailyChartOptions(chartDataStats) as ChartOptions<any>

  useEffect(handleGetBilling(setBilling, setBillingLoading, setMessageState, month), [developerId, month])

  return (
    <ErrorBoundary>
      <Section hasMargin={false} hasBoxShadow>
        <H5>Usage By Day</H5>
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
        <FadeIn>
          <StatsContainer>
            {billingLoading ? <Loader /> : <Line data={chartData} options={chartOptions} />}
          </StatsContainer>
        </FadeIn>
      </Section>
    </ErrorBoundary>
  )
}

export default AnalyticsDailyUsage
