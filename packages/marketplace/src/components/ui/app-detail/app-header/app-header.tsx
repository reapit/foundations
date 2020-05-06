import * as React from 'react'
import { Grid, GridItem, H3 } from '@reapit/elements'

import styles from '@/styles/pages/developer-app-detail.scss?mod'
import { AppDetailState } from '@/reducers/app-detail'
import DeveloperAppActionButtons from '@/components/ui/app-detail/app-header/developer-app-action-buttons'

export type AppHeaderProps = {
  appDetailState: AppDetailState
}

const AppHeader: React.FC<AppHeaderProps> = ({ appDetailState }) => {
  const { appDetailData } = appDetailState
  const { media, name } = appDetailData?.data || {}
  const appIcon = media?.filter(({ type }) => type === 'icon')[0]

  return (
    <>
      <Grid className="is-vcentered ">
        <GridItem className="is-4">
          <div className={styles.appIconContainer}>
            <img
              className="image"
              src={(appIcon && appIcon.uri) || 'https://bulma.io/images/placeholders/48x48.png'}
              alt={name}
            />
          </div>
        </GridItem>
        <GridItem className="is-8">
          <H3 className={styles.appName}>{name}</H3>
          <DeveloperAppActionButtons appDetailState={appDetailState} />
        </GridItem>
      </Grid>
    </>
  )
}

export default AppHeader
