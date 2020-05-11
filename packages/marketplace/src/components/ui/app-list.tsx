import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import AppCard from './app-card'
import styles from '@/styles/blocks/app-list.scss?mod'
import {
  Loader,
  H3,
  InfoType,
  GridFourCol,
  PaginationProps,
  Section,
  Pagination,
  GridThreeColItem,
  FlexContainerBasic,
  GridFourColItem,
  Helper,
  infoText,
} from '@reapit/elements'

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
  onSettingsClick?: (app: AppSummaryModel) => void
  title?: string
  infoType: InfoType
  pagination?: PaginationProps
  numOfColumn?: number
}

export const AppList: React.FunctionComponent<AppListProps> = ({
  list,
  loading,
  onCardClick,
  onSettingsClick,
  title,
  infoType,
  pagination,
  numOfColumn = 4,
}) => {
  const WrapperContainer = numOfColumn === 4 ? GridFourColItem : GridThreeColItem

  return (
    <FlexContainerBasic hasPadding flexColumn>
      {title && <H3>{title}</H3>}
      {!list.length && !loading ? (
        <Helper variant="info">
          {infoType
            ? infoText(infoType)
            : 'We are unable to find any Apps that match your search criteria. Please try again.'}
        </Helper>
      ) : (
        <GridFourCol
          className={`${styles.flexGrow} ${loading ? styles.contentIsLoading : ''}`}
          data-test="app-list-container"
        >
          {list.map(app => (
            <WrapperContainer key={app.id}>
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
            </WrapperContainer>
          ))}
        </GridFourCol>
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

export default AppList
