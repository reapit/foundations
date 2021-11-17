import * as React from 'react'
import { AppDetailState } from '@/reducers/apps/app-detail'
import { BodyText, ColSplit, Grid, InputWrap, Subtitle, Title } from '@reapit/elements'

export type AppContentProps = {
  appDetailState: AppDetailState
}

export type CustomUninstallCell = React.FC<{ onClick: () => void }>

export const AppContent: React.FC<AppContentProps> = ({ appDetailState }) => {
  const appDetailData = appDetailState.data || {}

  return (
    <>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Authentication (Client ID)</Subtitle>
            <BodyText hasGreyText>{appDetailData.id}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Status</Subtitle>
            <BodyText hasGreyText>{appDetailData.isHidden}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>General Information</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>App Name</Subtitle>
            <BodyText hasGreyText>{appDetailData.name}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Category</Subtitle>
            <BodyText hasGreyText>{appDetailData.category}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Support Email</Subtitle>
            <BodyText hasGreyText>{appDetailData.supportEmail}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Telephone</Subtitle>
            <BodyText hasGreyText>{appDetailData.telephone}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Agency Cloud Integration Type</Subtitle>
            <BodyText hasGreyText>{appDetailData.desktopIntegrationTypeIds}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Lanuch URL</Subtitle>
            <BodyText hasGreyText>{appDetailData.launchUri || 'None'}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Homepage</Subtitle>
            <BodyText hasGreyText>{appDetailData.homePage}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Pricing Info</Subtitle>
            <BodyText hasGreyText>{appDetailData.pricingUrl || 'Not available'}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Privacy Policy</Subtitle>
            <BodyText hasGreyText>{appDetailData.privacyPolicyUrl}</BodyText>
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
            <BodyText hasGreyText>{appDetailData.description}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Summary</Subtitle>
            <BodyText hasGreyText>{appDetailData.summary}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>Images</Title>
      <Title>Reapit Connect Authentication</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Redirect URL(s)*</Subtitle>
            <BodyText hasGreyText>{appDetailData.redirectUris?.join(', ')}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Sign Out URI(s)*</Subtitle>
            <BodyText hasGreyText>{appDetailData.signoutUris?.join(', ')}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>About Developer</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Description</Subtitle>
            <BodyText hasGreyText>{appDetailData.developerAbout}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
    </>
  )
}
