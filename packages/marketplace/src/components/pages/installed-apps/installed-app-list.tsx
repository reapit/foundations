import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import InstalledAppCard from './installed-app-card'
import * as installedAppListStyles from './__styles__/installed-app-list'
import {
  FadeIn,
  InfoType,
  PaginationProps,
  Pagination,
  isMobile,
  GridFourCol,
  GridFourColItem,
  Helper,
  infoText,
} from '@reapit/elements'
import { cx } from 'linaria'
import { Loader } from '@reapit/elements/v3'

export type InstalledAppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
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
  <div className={cx(installedAppListStyles.wrapList, loading && installedAppListStyles.contentIsLoading)}>
    {list.map((app) => (
      <InstalledAppCard key={app.id} app={app} onClick={onClickHandler(onCardClick, app)} />
    ))}
  </div>
)

export const ListDesktopScreen = ({
  list,
  loading,
  onCardClick,
}: Pick<InstalledAppListProps, 'list' | 'loading' | 'onCardClick'>) => (
  <GridFourCol className={cx(loading && installedAppListStyles.contentIsLoading)} data-test="app-list-container">
    {list.map((app) => (
      <GridFourColItem key={app.id}>
        <FadeIn>
          <InstalledAppCard app={app} onClick={onClickHandler(onCardClick, app)} />
        </FadeIn>
      </GridFourColItem>
    ))}
  </GridFourCol>
)

export const InstalledAppList: React.FC<InstalledAppListProps> = ({
  list,
  loading,
  onCardClick,
  infoType,
  pagination,
}) => {
  const isMobileView = isMobile()
  return (
    <>
      {!list.length && !loading ? (
        <Helper variant="info">
          {infoType ? infoText(infoType) : 'UNFORTUNATELY, YOUR SEARCH RETURNED NO RESULTS'}
        </Helper>
      ) : isMobileView ? (
        <ListMobileScreen list={list} loading={loading} onCardClick={onCardClick} />
      ) : (
        <ListDesktopScreen list={list} loading={loading} onCardClick={onCardClick} />
      )}
      {loading && <Loader label="Loading" fullPage />}
      {pagination && <Pagination {...pagination} />}
    </>
  )
}

export default InstalledAppList
