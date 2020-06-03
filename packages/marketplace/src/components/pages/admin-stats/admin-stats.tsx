import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import {
  FlexContainerResponsive,
  FlexContainerBasic,
  Content,
  H3,
  ButtonGroup,
  Button,
  H4,
  H5,
  Loader,
} from '@reapit/elements'
import styles from '@/styles/pages/admin-stats.scss?mod'
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
      return <H4>Total: {totalCount}</H4>
    }
    return (
      <div className={styles['chart-wrap']}>
        <Line data={chartConfig} />
      </div>
    )
  }

  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasPadding>
          <div className={styles.title}>
            <H3>Stats</H3>
          </div>
          <H5>Please select an area:</H5>
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
          <H5>Please select a time range:</H5>
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
          <H4>
            Showing results for ‘{area}’ and ‘{getRangeName(range)}’
          </H4>
          {renderResult()}
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default AdminStats
