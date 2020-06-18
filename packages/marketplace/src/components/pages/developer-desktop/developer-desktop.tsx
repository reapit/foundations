import * as React from 'react'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { FlexContainerBasic, FlexContainerResponsive, H3, LevelRight, Button } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import styles from '@/styles/pages/developer-desktop.scss?mod'
import DeveloperEditonModal from '@/components/ui/developer-edition-modal'
import DeveloperConfirmSubscription from '@/components/ui/developer-confirm-subscription'

export type DeveloperDesktopPageProps = {}

export const handleToggleVisibleModal = (
  setIsDeveloperEditionModalOpen: React.Dispatch<boolean>,
  isVisible: boolean,
) => () => setIsDeveloperEditionModalOpen(isVisible)

export const submitSubscription = (
  setIsDeveloperEditionModalOpen,
  setConfirmSubscriptionModalOpen,
  setSelectedDevelopers,
) => values => {
  setIsDeveloperEditionModalOpen(false)
  setSelectedDevelopers(values)
  setTimeout(() => {
    setConfirmSubscriptionModalOpen(true)
  }, 300)
}

export const handleCloseDeveloperConfirmSubscriptionModal = (
  setConfirmSubscriptionModalOpen: React.Dispatch<boolean>,
  setSelectedDevelopers: React.Dispatch<DeveloperModel[]>,
) => () => {
  setConfirmSubscriptionModalOpen(false)
  setSelectedDevelopers([])
}

export const DeveloperDesktopPage: React.FC<DeveloperDesktopPageProps> = () => {
  const [isDeveloperEditionModalOpen, setIsDeveloperEditionModalOpen] = React.useState<boolean>(false)
  const [isConfirmSubscriptionModalOpen, setConfirmSubscriptionModalOpen] = React.useState<boolean>(false)
  const [selectedDevelopers, setSelectedDevelopers] = React.useState<DeveloperModel[]>([])
  // For now just support 1 developer
  // We will support multiple developers after finish "organisations" feature
  const developer = selectedDevelopers.length > 0 ? selectedDevelopers[0] : null

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive className={styles.wrapDesktopPage} flexColumn hasBackground hasPadding>
          <H3>Desktop</H3>
          <LevelRight>
            <Button
              type="button"
              variant="primary"
              onClick={handleToggleVisibleModal(setIsDeveloperEditionModalOpen, true)}
            >
              Developer Edition
            </Button>
          </LevelRight>
        </FlexContainerResponsive>
      </FlexContainerBasic>

      <DeveloperEditonModal
        visible={isDeveloperEditionModalOpen}
        afterClose={handleToggleVisibleModal(setIsDeveloperEditionModalOpen, false)}
        handleSubmit={submitSubscription(
          setIsDeveloperEditionModalOpen,
          setConfirmSubscriptionModalOpen,
          setSelectedDevelopers,
        )}
      />
      {developer && (
        <DeveloperConfirmSubscription
          visible={isConfirmSubscriptionModalOpen}
          developer={developer}
          afterClose={handleCloseDeveloperConfirmSubscriptionModal(
            setConfirmSubscriptionModalOpen,
            setSelectedDevelopers,
          )}
        />
      )}
    </ErrorBoundary>
  )
}

export default DeveloperDesktopPage
