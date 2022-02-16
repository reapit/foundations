import React, { FC, useEffect } from 'react'
import { BodyText, ColSplit, Grid, InputWrap, Loader, PersistantNotification, Subtitle, Title } from '@reapit/elements'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { useParams } from 'react-router-dom'
import { handleSetAppId } from '../utils/handle-set-app-id'

export const AppDetail: FC = () => {
  const { appsDataState, setAppId } = useAppState()
  const { appId } = useParams<AppUriParams>()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  const { appDetail, appDetailLoading } = appsDataState

  return appDetailLoading ? (
    <Loader />
  ) : appDetail ? (
    <>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Authentication (Client ID)</Subtitle>
            <BodyText hasGreyText>{appDetail?.externalId}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Status</Subtitle>
            <BodyText hasGreyText>{appDetail?.isHidden}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>General Information</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>App Name</Subtitle>
            <BodyText hasGreyText>{appDetail?.name}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Category</Subtitle>
            <BodyText hasGreyText>{appDetail?.category}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Support Email</Subtitle>
            <BodyText hasGreyText>{appDetail?.supportEmail}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Telephone</Subtitle>
            <BodyText hasGreyText>{appDetail?.telephone}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Agency Cloud Integration Type</Subtitle>
            <BodyText hasGreyText>{appDetail?.desktopIntegrationTypeIds}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Lanuch URL</Subtitle>
            <BodyText hasGreyText>{appDetail?.launchUri || 'None'}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Homepage</Subtitle>
            <BodyText hasGreyText>{appDetail?.homePage}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Pricing Info</Subtitle>
            <BodyText hasGreyText>{appDetail?.pricingUrl || 'Not available'}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Privacy Policy</Subtitle>
            <BodyText hasGreyText>{appDetail?.privacyPolicyUrl}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Permissions</Subtitle>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>About App</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Description</Subtitle>
            <BodyText hasGreyText>{appDetail?.description}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Summary</Subtitle>
            <BodyText hasGreyText>{appDetail?.summary}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>Images</Title>
      <Title>Reapit Connect Authentication</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Redirect URL(s)*</Subtitle>
            <BodyText hasGreyText>{appDetail?.redirectUris?.join(', ')}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Sign Out URI(s)*</Subtitle>
            <BodyText hasGreyText>{appDetail?.signoutUris?.join(', ')}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>About Developer</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Description</Subtitle>
            <BodyText hasGreyText>{appDetail?.developerAbout}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
    </>
  ) : (
    <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
      No record of this app found
    </PersistantNotification>
  )
}

export default AppDetail
