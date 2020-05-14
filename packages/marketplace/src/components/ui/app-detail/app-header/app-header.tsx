import * as React from 'react'
import { Grid, GridItem, H3 } from '@reapit/elements'

import styles from '@/styles/pages/developer-app-detail.scss?mod'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

export type AppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const AppHeader: React.FC<AppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { media, name } = appDetailData
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
          {buttonGroup}
        </GridItem>
      </Grid>
    </>
  )
}

export default AppHeader
