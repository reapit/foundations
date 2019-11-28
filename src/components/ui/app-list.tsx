import * as React from 'react'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import AppCard from './app-card'
import styles from '@/styles/blocks/app-list.scss?mod'
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
  FlexContainerBasic
} from '@reapit/elements'

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
  onSettingsClick?: (app: AppSummaryModel) => void
  title?: string
  infoType: InfoType
  pagination?: PaginationProps
}

export const AppList: React.FunctionComponent<AppListProps> = ({
  list,
  loading,
  onCardClick,
  onSettingsClick,
  title,
  infoType,
  pagination
}) => {
  return (
    <FlexContainerBasic hasPadding flexColumn>
      {title && <H3>{title}</H3>}
      <div>
        <GridFiveCol className={` ${loading ? styles.contentIsLoading : ''}`} data-test="app-list-container">
          {!list.length && !loading ? (
            <Info infoType={infoType} />
          ) : (
            list.map(app => (
              <GridThreeColItem key={app.id}>
                <AppCard
                  app={app}
                  onClick={
                    onCardClick
                      ? (event: React.MouseEvent) => {
                          event.stopPropagation()
                          onCardClick(app)
                        }
                      : undefined
                  }
                  onSettingsClick={
                    onSettingsClick
                      ? (event: React.MouseEvent) => {
                          event.stopPropagation()
                          onSettingsClick(app)
                        }
                      : undefined
                  }
                />
              </GridThreeColItem>
            ))
          )}
        </GridFiveCol>
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

export default AppList
