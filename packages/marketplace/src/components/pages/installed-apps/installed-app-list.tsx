import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import InstalledAppCard from './installed-app-card'
import * as installedAppListStyles from './__styles__/installed-app-list'
import {
  Loader,
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
import FadeIn from '../../../core/__styles__/fade-in'

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
    {list.map(app => (
      <FadeIn key={app.id}>
        <InstalledAppCard app={app} onClick={onClickHandler(onCardClick, app)} />
      </FadeIn>
    ))}
  </div>
)

export const ListDesktopScreen = ({
  list,
  loading,
  onCardClick,
}: Pick<InstalledAppListProps, 'list' | 'loading' | 'onCardClick'>) => (
  <GridFourCol className={cx(loading && installedAppListStyles.contentIsLoading)} data-test="app-list-container">
    {list.map(app => (
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
  return (
    <>
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
      {pagination && <Pagination {...pagination} />}
    </>
  )
}

export default InstalledAppList
