import * as React from 'react'
import { FadeIn, Section } from '@reapit/elements'
import {
  SummarySection,
  AdditionalImagesSection,
  PermissionsSection,
  DescriptionSection,
  DeveloperAboutSection,
} from '../common/ui-sections'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

export type AppContentProps = {
  appDetailData: AppDetailModel
}

const AppContent: React.FC<AppContentProps> = ({ appDetailData }) => {
  const { summary = '', description = '', scopes = [], media = [], developerAbout } = appDetailData

  return (
    <Section isFlex isFlexColumn hasPadding={false} hasMargin={false}>
      <FadeIn>
        <SummarySection summary={summary} />
        <AdditionalImagesSection images={media} splitIndex={1} numberImages={2} />
        <DescriptionSection description={description} />
        <AdditionalImagesSection images={media} splitIndex={3} numberImages={2} />
        {developerAbout && <DeveloperAboutSection>{developerAbout}</DeveloperAboutSection>}
        <PermissionsSection permissions={scopes} />
      </FadeIn>
    </Section>
  )
}

export default AppContent
