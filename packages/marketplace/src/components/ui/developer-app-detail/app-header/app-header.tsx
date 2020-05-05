import * as React from 'react'
import { Grid, GridItem, H3 } from '@reapit/elements'
import { MediaModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/developer-app-detail.scss?mod'

type AppHeaderProps = {
  appIcon?: MediaModel
  appName?: string
  developer?: string
}

const AppHeader: React.FC<AppHeaderProps> = ({ appIcon, appName, developer }) => {
  return (
    <Grid className="is-vcentered ">
      <GridItem className="is-3">
        <div className={styles.appIconContainer}>
          <img
            className="image"
            src={(appIcon && appIcon.uri) || 'https://bulma.io/images/placeholders/48x48.png'}
            alt={name}
          />
        </div>
      </GridItem>
      <GridItem className="is-9">
        <H3 className={styles.appName}>{appName}</H3>
        <p>{developer}</p>
      </GridItem>
    </Grid>
  )
}

export default AppHeader
