import { Button, elMb3, Icon, SmallText, Subtitle } from '@reapit/elements'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { openNewPage, ExternalPages } from '../../../../utils/navigation'
import { useAppState } from '../state/use-app-state'
import { getCurrentPage } from '../utils/get-current-page'

export const Helper: FC = () => {
  const location = useLocation()
  const { appId } = useAppState()
  const { pathname } = location
  const { isAppsEdit, isAppsDetail } = getCurrentPage(pathname)

  if (isAppsEdit) {
    return (
      <>
        <Icon className={elMb3} icon="editAppInfographic" iconSize="large" />
        <Subtitle>Saving Your App</Subtitle>
        <SmallText hasGreyText>
          Before you list your app you can save the details at any point below. After app listing, you will have to
          create an app revision for our team to review.
        </SmallText>
      </>
    )
  }

  if (isAppsDetail) {
    return (
      <>
        <Icon className={elMb3} icon="appMarketInfographic" iconSize="large" />
        <Subtitle>Preview in AppMarket</Subtitle>
        <SmallText hasGreyText>
          Clicking below will take you to your current AppMarket listing, to view your app as users will see it.
        </SmallText>
        <Button
          className={elMb3}
          intent="primary"
          onClick={openNewPage(`${window.reapit.config.marketplaceUrl}/${appId}`)}
          chevronRight
        >
          Preview
        </Button>
      </>
    )
  }

  return (
    <>
      <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
      <Subtitle>Apps Documentation</Subtitle>
      <SmallText hasGreyText>
        This is the dashboard for your applications created using the Reapit Foundations platform. If you have not
        created an app before or you need help, please take the time to view our getting started guide.
      </SmallText>
      <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
        View Docs
      </Button>
    </>
  )
}
