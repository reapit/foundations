import * as React from 'react'
import { Grid, GridItem, H3, Button, H6 } from '@reapit/elements'

import styles from '@/styles/pages/developer-app-detail.scss?mod'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsWebComponentOpen } from '@/selector/client'
import WebComponentModal from '../../web-component-config-modal'
import { clientCloseWebComponentConfig, clientOpenWebComponentConfig } from '@/actions/client'
import { Dispatch } from 'redux'

export const toggleWebComponentModal = (dispatch: Dispatch) => () => {
  dispatch(clientOpenWebComponentConfig())
}
export const closeWebComponentModal = (dispatch: Dispatch) => () => {
  dispatch(clientCloseWebComponentConfig())
}

export type AppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const AppHeader: React.FC<AppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const dispatch = useDispatch()
  const isWebComponentOpen = useSelector(selectIsWebComponentOpen)
  const handleToggleWebComponentModal = toggleWebComponentModal(dispatch)
  const handleCloseWebComponentModal = closeWebComponentModal(dispatch)

  const { media, name, isWebComponent } = appDetailData
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
          {!isWebComponent && (
            <>
              <GridItem>
                <H6>Settings</H6>
                <Button type="button" variant="primary" fullWidth onClick={handleToggleWebComponentModal}>
                  Configuration
                </Button>
              </GridItem>
              {isWebComponentOpen && (
                <WebComponentModal
                  type="BOOK_VIEWING"
                  afterClose={handleCloseWebComponentModal}
                  closeModal={handleCloseWebComponentModal}
                />
              )}
            </>
          )}
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
