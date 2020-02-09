import * as React from 'react'
import { shallow } from 'enzyme'
import DeveloperInstallationsChart, {
  DeveloperInstallationsChartProps,
  getChartOptions,
} from '../developer-installations-chart'
import { installedAppsStub } from '../__stubs__/developer-installations-chart-data'
import { groupInstalledAppsByDate } from '@/utils/developer-analytics'

const props: DeveloperInstallationsChartProps = {
  data: installedAppsStub,
}

describe('DeveloperInstallationsChart', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperInstallationsChart {...props} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('DeveloperInstallationsChart getChartOptions', () => {
  it('should run correctly', () => {
    const grouppedAppsByDate = groupInstalledAppsByDate(installedAppsStub)
    const options = getChartOptions(grouppedAppsByDate)
    expect(options.tooltips).not.toBeNull()
  })
})
