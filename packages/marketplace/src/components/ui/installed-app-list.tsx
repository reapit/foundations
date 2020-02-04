import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import InstalledAppCard from './installed-app-card'
import installedAppListStyles from '@/styles/blocks/installed-app-list.scss?mod'
import {
  Loader,
  H3,
  InfoType,
  PaginationProps,
  Section,
  Pagination,
  FlexContainerBasic,
  isMobile,
  GridFourCol,
  GridFourColItem,
  Helper,
  infoText,
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
  event: React.MouseEvent,
) => {
  if (onCardClick) {
    event.stopPropagation()
    onCardClick(app)
  }
}

export const ListMobileScreen = ({
  list,
  loading,
  onCardClick,
}: Pick<InstalledAppListProps, 'list' | 'loading' | 'onCardClick'>) => (
  <div className={`${installedAppListStyles.wrapList} ${loading ? installedAppListStyles.isLoading : ''}`}>
    {list.map(app => (
      <InstalledAppCard key={app.id} app={app} onClick={onClickHandler(onCardClick, app)} />
    ))}
  </div>
)

export const ListDesktopScreen = ({
  list,
  loading,
  onCardClick,
}: Pick<InstalledAppListProps, 'list' | 'loading' | 'onCardClick'>) => (
  <GridFourCol className={` ${loading ? installedAppListStyles.contentIsLoading : ''}`} data-test="app-list-container">
    {list.map(app => (
      <GridFourColItem key={app.id}>
        <InstalledAppCard key={app.id} app={app} onClick={onClickHandler(onCardClick, app)} />
      </GridFourColItem>
    ))}
  </GridFourCol>
)

export const InstalledAppList: React.FC<InstalledAppListProps> = ({
  list,
  loading,
  onCardClick,
  title,
  infoType,
  pagination,
}) => {
  return (
    <FlexContainerBasic hasPadding flexColumn>
      {title && <H3>{title}</H3>}
      {!list.length && !loading ? (
        <Helper variant="info">
          {infoType ? infoText(infoType) : 'UNFORTUNATELY, YOUR SEARCH RETURNED NO RESULTS'}
        </Helper>
      ) : isMobile() ? (
        <ListMobileScreen list={list} loading={loading} onCardClick={onCardClick} />
      ) : (
        <ListDesktopScreen list={list} loading={loading} onCardClick={onCardClick} />
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
