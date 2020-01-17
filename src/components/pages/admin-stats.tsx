import React from 'react'
import { FlexContainerResponsive, FlexContainerBasic, Content, H3, ButtonGroup, Button, H4, H5 } from '@reapit/elements'
import styles from '@/styles/pages/admin-stats.scss?mod'

export type Area = 'APPS' | 'DEVELOPERS' | 'INSTALLATIONS'
export type Range = 'WEEK' | 'MONTH' | 'ALL'

export const AdminStats: React.FC = () => {
  const [area, setArea] = React.useState<Area>('APPS')
  const [range, setRange] = React.useState<Range>('WEEK')
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
          <H4>Showing results for ‘insert area selection’ and ‘insert time range selection’</H4>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default AdminStats
