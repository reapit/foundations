import * as React from 'react'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import InstalledAppCard from './installed-app-card'
import installedAppListStyles from '@/styles/blocks/installed-app-list.scss?mod'
import {
  Loader,
  H3,
  InfoType,
  Info,
  PaginationProps,
  Section,
  Pagination,
  FlexContainerBasic,
  isMobile,
  GridFiveCol,
  GridFourColItem
} from '@reapit/elements'

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

export const ListMobileScreen = ({ list, loading, onCardClick, infoType }) => {
  const isNoResult = !list.length && !loading

  return (
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
  )
}

export const ListDesktopScreen = ({ list, loading, infoType, onCardClick }) => {
  const isNoResult = !list.length && !loading

  return (
    <GridFiveCol
      className={` ${loading ? installedAppListStyles.contentIsLoading : ''}`}
      data-test="app-list-container"
    >
      {isNoResult ? (
        <Info infoType={infoType}>{!infoType && 'UNFORTUNATELY, YOUR SEARCH RETURNED NO RESULTS'}</Info>
      ) : (
        list.map(app => (
          <GridFourColItem key={app.id}>
            <InstalledAppCard key={app.id} app={app} onClick={onClickHandler(onCardClick, app)} />
          </GridFourColItem>
        ))
      )}
    </GridFiveCol>
  )
}

export const InstalledAppList: React.FC<InstalledAppListProps> = ({
  list,
  loading,
  onCardClick,
  title,
  infoType,
  pagination
}) => {
  return (
    <FlexContainerBasic hasPadding flexColumn>
      {title && <H3>{title}</H3>}
      {isMobile() ? (
        <ListMobileScreen list={list} loading={loading} infoType={infoType} onCardClick={onCardClick} />
      ) : (
        <ListDesktopScreen list={list} loading={loading} infoType={infoType} onCardClick={onCardClick} />
      )}
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
