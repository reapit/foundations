import * as React from 'react'
import AppContent from './client/app-content'
import { Aside as AppAside } from './client/aside'
import AppHeader from './common/ui-app-header'
import { useParams } from 'react-router'
import { AppDetailData } from '@/reducers/developer'
import { Grid, Loader, GridItem, Section } from '@reapit/elements'
import { BackToAppsSection } from '../app-detail/app-sections'
import useReactResponsive from '@/components/hooks/use-react-responsive'

export type AppDetailPreviewProps = {}

export const loadAppDetailPreviewDataFromLocalStorage = (
  appId: string,
  setAppDetailPreviewData: React.Dispatch<React.SetStateAction<AppDetailPreviewProps | null>>,
) => () => {
  try {
    const appDataString = localStorage.getItem('developer-preview-app')
    if (!appDataString) {
      throw 'No app preview'
    }

    const appData = JSON.parse(appDataString) as AppDetailData
    if (appData?.id !== appId) {
      throw 'No app preview'
    }
    setAppDetailPreviewData(appData)
  } catch (err) {}
}

const AppDetailPreview: React.FC<AppDetailPreviewProps> = () => {
  const { isMobile } = useReactResponsive()
  const [appDetailPreviewData, setAppDetailPreviewData] = React.useState<AppDetailPreviewProps | null>(null)
  const { appId } = useParams()

  React.useEffect(loadAppDetailPreviewDataFromLocalStorage(appId, setAppDetailPreviewData), [appId])

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
              {!isMobile && <BackToAppsSection onClick={() => {}} />}
            </Section>
          </GridItem>
        </>
      )}
    </Grid>
  )
}
export default AppDetailPreview
