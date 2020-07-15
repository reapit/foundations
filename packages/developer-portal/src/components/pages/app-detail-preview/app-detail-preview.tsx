// The UI of this page should be the same as the Standalone App Detail page in Marketplace portal
// Make sure to always update the UI in both places if needed
import * as React from 'react'
import AppContent from './client/app-content'
import { Aside as AppAside } from './client/aside'
import AppHeader from './common/ui-app-header'
import { useParams } from 'react-router'
import { AppDetailData } from '@/reducers/developer'
import { Grid, Loader, GridItem, Section } from '@reapit/elements'
import { Dispatch } from 'redux'
import { showNotificationMessage } from '@/actions/notification-message'
import { useDispatch } from 'react-redux'

export type AppDetailPreviewProps = {}

export const loadAppDetailPreviewDataFromLocalStorage = (
  appId: string,
  setAppDetailPreviewData: React.Dispatch<React.SetStateAction<AppDetailPreviewProps | null>>,
  dispatch: Dispatch,
) => () => {
  try {
    const appDataString = localStorage.getItem('developer-preview-app')
    if (!appDataString) {
      throw new Error('No app preview')
    }

    const appData = JSON.parse(appDataString) as AppDetailData
    if (appData?.id !== appId) {
      throw new Error('No app preview')
    }
    setAppDetailPreviewData(appData)
  } catch (err) {
    dispatch(
      showNotificationMessage({
        message: err.message,
        variant: 'danger',
      }),
    )
  }
}

const AppDetailPreview: React.FC<AppDetailPreviewProps> = () => {
  const dispatch = useDispatch()
  const [appDetailPreviewData, setAppDetailPreviewData] = React.useState<AppDetailPreviewProps | null>(null)
  const { appId } = useParams()

  React.useEffect(loadAppDetailPreviewDataFromLocalStorage(appId, setAppDetailPreviewData, dispatch), [appId, dispatch])

  return (
    <Grid dataTest="client-app-detail-container">
      {!appDetailPreviewData ? (
        <Loader dataTest="client-app-detail-loader" />
      ) : (
        <>
          <GridItem className="is-one-quarter">
            <AppAside appDetailData={appDetailPreviewData} desktopIntegrationTypes={[]} />
          </GridItem>
          <GridItem className="is-three-quarters">
            <Section isFlex isFlexColumn isFullHeight>
              <AppHeader appDetailData={appDetailPreviewData} />
              <AppContent appDetailData={appDetailPreviewData} />
            </Section>
          </GridItem>
        </>
      )}
    </Grid>
  )
}
export default AppDetailPreview
