import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { H5, Section, Loader, FadeIn } from '@reapit/elements-legacy'
import { BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { MessageContext } from '../../../context/message-context'
import { ChartContainer } from './__styles__/analytics'
import { handleGetBillingByPeriod, mapServiceChartDataSet } from './analytics-handlers'
import { ChartOptions } from 'chart.js'

export const AnalyticsMonthlyUsage: React.FC = () => {
  const [billing, setBilling] = useState<BillingOverviewForPeriodV2Model>()
  const [billingLoading, setBillingLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)
  const orgId = connectSession?.loginIdentity?.orgId ?? null
  const dateFrom = new Date('2020-12-01')
  const dateTo = new Date()
  const datasets = mapServiceChartDataSet(billing ?? null)

  useEffect(handleGetBillingByPeriod(setBilling, setBillingLoading, setMessageState, orgId, dateFrom, dateTo), [orgId])

  return (
    <Section hasMargin={false} hasBoxShadow>
      <H5>Monthly Cost</H5>
      <FadeIn>
        <ChartContainer>
          {billingLoading ? (
            <Loader />
          ) : (
            <Bar
              data={datasets}
              width={50}
              height={50}
              options={
                {
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        scaleLabel: {
                          display: true,
                          labelString: 'Total Cost ( £ )',
                        },
                      },
                    ],
                  },
                } as ChartOptions<any>
              }
            />
          )}
        </ChartContainer>
      </FadeIn>
    </Section>
  )
}

export default AnalyticsMonthlyUsage
