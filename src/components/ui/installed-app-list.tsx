import * as React from 'react'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import InstalledAppCard from './installed-app-card'
import installedAppListStyles from '@/styles/blocks/installed-app-list.scss?mod'
import { Loader, H3, InfoType, Info, PaginationProps, Section, Pagination, FlexContainerBasic } from '@reapit/elements'

export type InstalledAppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
  title?: string
  infoType: InfoType
  pagination?: PaginationProps
}

export const onClickHandler = (onCardClick: ((app: AppSummaryModel) => void) | undefined, app: AppSummaryModel) => (
  event: React.MouseEvent
) => {
  if (onCardClick) {
    event.stopPropagation()
    onCardClick(app)
  }
}

export const InstalledAppList: React.FC<InstalledAppListProps> = ({
  list,
  loading,
  onCardClick,
  title,
  infoType,
  pagination
}) => {
  const isNoResult = !list.length && !loading
  return (
    <FlexContainerBasic hasPadding flexColumn>
      {title && <H3>{title}</H3>}
      <div
        className={`${installedAppListStyles['wrap-list']} ${
          loading ? installedAppListStyles['content-is-loading'] : ''
        }`}
      >
        {isNoResult ? (
          <Info infoType={infoType}>{!infoType && 'UNFORTUNATELY, YOUR SEARCH RETURNED NO RESULTS'}</Info>
        ) : (
          list.map(app => <InstalledAppCard key={app.id} app={app} onClick={onClickHandler(onCardClick, app)} />)
        )}
      </div>
      {loading && <Loader body />}
      {pagination && (
        <Section>
          <Pagination {...pagination} />
        </Section>
      )}
    </FlexContainerBasic>
  )
}

export default InstalledAppList
