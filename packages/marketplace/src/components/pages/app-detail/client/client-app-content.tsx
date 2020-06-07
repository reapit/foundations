import * as React from 'react'
import { FlexContainerBasic } from '@reapit/elements'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import {
  SummarySection,
  AdditionalImagesSection,
  PermissionsSection,
  DescriptionSection,
  // SecondaryImageSection,
} from '../common/ui-sections'

export type AppContentProps = {
  appDetailData: AppDetailDataNotNull
}

const AppContent: React.FC<AppContentProps> = ({ appDetailData }) => {
  const { summary = '', description = '', scopes = [], media = [] } = appDetailData

  return (
    <FlexContainerBasic flexColumn>
      <SummarySection summary={summary} />
      <DescriptionSection description={description} />
      {/* <SecondaryImageSection images={media} /> */}
      <AdditionalImagesSection images={media} />
      <PermissionsSection permissions={scopes} />
    </FlexContainerBasic>
  )
}

export default AppContent
