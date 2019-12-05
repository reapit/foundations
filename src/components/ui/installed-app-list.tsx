import * as React from 'react'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import InstalledAppCard from './installed-app-card'
import installedAppListStyles from '@/styles/blocks/installed-app-list.scss?mod'
import {
  Loader,
  H3,
  InfoType,
  Info,
  GridFiveCol,
  PaginationProps,
  Section,
  Pagination,
  GridThreeColItem,
  FlexContainerBasic,
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
      <div>
        <div className={`${installedAppListStyles.wrapList} ${loading ? installedAppListStyles.contentIsLoading : ''}`}>
          {isNoResult ? (
            <Info infoType={infoType}>{!infoType && 'UNFORTUNATELY, YOUR SEARCH RETURNED NO RESULTS'}</Info>
          ) : (
            list.map(app => (
              <InstalledAppCard
                key={app.id}
                app={app}
                onClick={
                  onCardClick
                    ? (event: React.MouseEvent) => {
                        event.stopPropagation()
                        onCardClick(app)
                      }
                    : undefined
                }
              />
            ))
          )}
        </div>
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
