import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { H3, ButtonGroup, Button, H6, Loader, Section } from '@reapit/elements'
import { AdminStatsRequestParams, adminStatsRequestData } from '@/actions/admin-stats'
import { Line } from 'react-chartjs-2'
import { getChartData, getChartConfig, getRangeName } from '@/utils/admin-stats'
import { selectAdminStats } from '@/selector/admin'

export type Area = 'APPS' | 'DEVELOPERS' | 'INSTALLATIONS'
export type Range = 'WEEK' | 'MONTH' | 'ALL'

export const handleLoadStats = (dispatch: Dispatch) => (params: AdminStatsRequestParams) => {
  dispatch(adminStatsRequestData(params))
}

export const AdminStats: React.FC = () => {
  const dispatch = useDispatch()
  const adminStats = useSelector(selectAdminStats)

  const {
    loading,
    result: { data = [], totalCount = 0 },
  } = adminStats

  const loadStats = handleLoadStats(dispatch)

  const [area, setArea] = React.useState<Area>('APPS')
  const [range, setRange] = React.useState<Range>('WEEK')

  useEffect(() => {
    loadStats({ area, range })
  }, [area, range])

  const chartConfig = useMemo(() => {
    let chartData = { labels: [] as Array<string>, data: [] as Array<any> }
    if (range !== 'ALL') {
      chartData = getChartData(data, range)
    }
    return getChartConfig(chartData.labels, chartData.data, area)
  }, [range, area, data, getChartConfig, getChartData])

  const renderResult = () => {
    if (loading) return <Loader />
    if (range === 'ALL') {
      return <H6>Total: {totalCount}</H6>
    }
    return (
      <Section>
        <Line data={chartConfig} />
      </Section>
    )
  }

  return (
    <>
      <Section>
        <H3 className="mb-0">Stats</H3>
      </Section>
      <Section>
        <H6>Please select an area:</H6>
        <ButtonGroup>
          <Button
            className="ml-0"
            type="button"
            dataTest="area-apps-btn"
            variant={area === 'APPS' ? 'primary' : 'secondary'}
            onClick={() => setArea('APPS')}
          >
            Apps
          </Button>
          <Button
            type="button"
            dataTest="area-developers-btn"
            variant={area === 'DEVELOPERS' ? 'primary' : 'secondary'}
            onClick={() => setArea('DEVELOPERS')}
          >
            Developers
          </Button>
          <Button
            type="button"
            dataTest="area-installations-btn"
            variant={area === 'INSTALLATIONS' ? 'primary' : 'secondary'}
            onClick={() => setArea('INSTALLATIONS')}
          >
            Installations
          </Button>
        </ButtonGroup>
        <H6>Please select a time range:</H6>
        <ButtonGroup>
          <Button
            className="ml-0"
            type="button"
            dataTest="range-week-btn"
            variant={range === 'WEEK' ? 'primary' : 'secondary'}
            onClick={() => setRange('WEEK')}
          >
            Last week
          </Button>
          <Button
            type="button"
            dataTest="range-month-btn"
            variant={range === 'MONTH' ? 'primary' : 'secondary'}
            onClick={() => setRange('MONTH')}
          >
            Last Month
          </Button>
          <Button
            type="button"
            dataTest="range-all-btn"
            variant={range === 'ALL' ? 'primary' : 'secondary'}
            onClick={() => setRange('ALL')}
          >
            All time
          </Button>
        </ButtonGroup>
        <H6>
          Showing results for ‘{area}’ and ‘{getRangeName(range)}’
        </H6>
      </Section>

      {renderResult()}
    </>
  )
}

export default AdminStats
