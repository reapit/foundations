import * as React from 'react'
import { Section, H5, FadeIn, DATE_TIME_FORMAT, Loader, Formik, DatePicker, Form } from '@reapit/elements'
import ErrorBoundary from '../../hocs/error-boundary'
import { Line } from 'react-chartjs-2'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  getAppHttpTrafficPerDayChartData,
  getDailyChartConfig,
  getDailyChartOptions,
  handleAutoSave,
  handleGetBillingByPeriod,
  handleOnSave,
} from './analytics-handlers'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { MessageContext } from '../../../context/message-context'
import { StatsContainer } from './__styles__/analytics'
import FormikAutoSave from '../../hocs/formik-auto-save'
import { BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'

export const AnalyticsDailyUsage: React.FC = () => {
  const [billing, setBilling] = useState<BillingOverviewForPeriodV2Model>()
  const [billingLoading, setBillingLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)
  const [month, setMonth] = useState<Date>(new Date())
  const orgId = connectSession?.loginIdentity?.orgId ?? null
  const onSave = useCallback(handleOnSave(setMonth), [])
  const appHttpTrafficPerDayChartData = getAppHttpTrafficPerDayChartData(billing?.periods ?? [])
  const { labels, data, chartDataStats } = appHttpTrafficPerDayChartData
  const chartData = getDailyChartConfig(labels, data)
  const chartOptions = getDailyChartOptions(chartDataStats)

  useEffect(handleGetBillingByPeriod(setBilling, setBillingLoading, setMessageState, orgId, month, month), [
    orgId,
    month,
  ])

  return (
    <ErrorBoundary>
      <Section hasMargin={false}>
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
