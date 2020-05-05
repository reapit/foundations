import * as React from 'react'
import { Grid, GridItem, H3, Button } from '@reapit/elements'

import styles from '@/styles/pages/developer-app-detail.scss?mod'
import { AppDetailState } from '@/reducers/app-detail'

export type AppHeaderProps = {
  appDetailState: AppDetailState
  onInstallationButtonClick: () => void
  onPendingRevisionButtonClick: () => void
  onEditDetailButtonClick: () => void
  onDeleteAppButtonClick: () => void
}

const AppHeader: React.FC<AppHeaderProps> = ({
  appDetailState,
  onInstallationButtonClick,
  onPendingRevisionButtonClick,
  onDeleteAppButtonClick,
  onEditDetailButtonClick,
}) => {
  const { appDetailData } = appDetailState
  const { media, name, pendingRevisions } = appDetailData?.data || {}
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
          <Grid>
            <GridItem className="is-narrow">
              <Button variant="primary" type="button" onClick={onInstallationButtonClick}>
                Installation
              </Button>
            </GridItem>
            <GridItem>
              {pendingRevisions ? (
                <Button
                  className="is-pulled-right ml-2"
                  type="button"
                  variant="primary"
                  dataTest="detail-modal-edit-button"
                  onClick={onPendingRevisionButtonClick}
                >
                  Pending Revision
                </Button>
              ) : (
                <Button
                  className="is-pulled-right ml-2"
                  variant="primary"
                  type="button"
                  onClick={onEditDetailButtonClick}
                >
                  Edit Detail
                </Button>
              )}

              <Button className="is-pulled-right" variant="danger" type="button" onClick={onDeleteAppButtonClick}>
                Delete App
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  )
}

export default AppHeader
