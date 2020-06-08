import * as React from 'react'
import { FlexContainerBasic } from '@reapit/elements'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { SummarySection, AdditionalImagesSection, PermissionsSection, DescriptionSection } from '../common/ui-sections'

export type AppContentProps = {
  appDetailData: AppDetailDataNotNull
}

const AppContent: React.FC<AppContentProps> = ({ appDetailData }) => {
  const { summary = '', description = '', scopes = [], media = [] } = appDetailData

  return (
    <FlexContainerBasic flexColumn>
      <SummarySection summary={summary} />
      <AdditionalImagesSection images={media} splitIndex={1} numberImages={2} />
      <DescriptionSection description={description} />
      <AdditionalImagesSection images={media} splitIndex={3} numberImages={2} />
      <PermissionsSection permissions={scopes} />
    </FlexContainerBasic>
  )
}

export default AppContent
