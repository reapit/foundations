import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import AppCard from './app-card'
import styles from '@/styles/blocks/app-list.scss?mod'
import { Loader, H3, InfoType, GridFourCol, GridThreeColItem, Helper, infoText, Button } from '@reapit/elements'
import { SubmitAppWizardModal } from '../ui/submit-app-wizard'

export type AppListProps = {
  list: AppSummaryModel[]
  loading: boolean
  onCardClick?: (app: AppSummaryModel) => void
  onSettingsClick?: (app: AppSummaryModel) => void
  title?: string
  infoType: InfoType
  hasSubmitButton?: boolean
}

export const onShowSubmitAppModal = (setSubmitAppModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setSubmitAppModalVisible(true)
}

export const onCloseSubmitAppModal = (
  setSubmitAppModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  setSubmitAppModalVisible(false)
}

export const renderHeader = ({ hasSubmitButton, title }: { hasSubmitButton: boolean; title: string | undefined }) => {
  const [submitAppModalVisible, setSubmitAppModalVisible] = React.useState<boolean>(false)

  if (!title) return null
  if (!hasSubmitButton) {
    return <H3>{title}</H3>
  } else {
    return (
      <div className={styles.headerHasButton}>
        <H3>{title}</H3>
        <Button onClick={onShowSubmitAppModal(setSubmitAppModalVisible)} type="button" variant="primary">
          Create new app
        </Button>
        <SubmitAppWizardModal
          visible={submitAppModalVisible}
          afterClose={onCloseSubmitAppModal(setSubmitAppModalVisible)}
        />
      </div>
    )
  }
}

export const AppList: React.FunctionComponent<AppListProps> = ({
  list,
  loading,
  onCardClick,
  onSettingsClick,
  title,
  infoType,
  hasSubmitButton = false,
}) => {
  return (
    <div className="mb-4">
      {renderHeader({ hasSubmitButton, title })}
      {!list.length && !loading ? (
        <Helper variant="info">
          {infoType
            ? infoText(infoType)
            : 'We are unable to find any Apps that match your search criteria. Please try again.'}
        </Helper>
      ) : (
        <GridFourCol className={` ${loading ? styles.contentIsLoading : ''}`} data-test="app-list-container">
          {list.map(app => (
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
          ))}
        </GridFourCol>
      )}
      {loading && <Loader body />}
    </div>
  )
}

export default AppList
