import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { FlexContainerBasic, FlexContainerResponsive, H3, LevelRight, Button } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import styles from '@/styles/pages/developer-desktop.scss?mod'
import DeveloperEditonModal from '@/components/ui/developer-edition-modal'
import DeveloperConfirmSubscription from '@/components/ui/developer-confirm-subscription'
import { developerCreateSubscription } from '@/actions/developer-subscriptions'

const DISPLAY_MODAL_TIMEOUT = 300

export type DeveloperDesktopPageProps = {}

export const handleToggleVisibleModal = (
  setIsDeveloperEditionModalOpen: React.Dispatch<boolean>,
  isVisible: boolean,
) => () => setIsDeveloperEditionModalOpen(isVisible)

export const confirmSubscription = (
  setIsDeveloperEditionModalOpen,
  setConfirmSubscriptionModalOpen,
  setSelectedDevelopers,
) => values => {
  setIsDeveloperEditionModalOpen(false)
  setSelectedDevelopers(values)
  setTimeout(() => {
    setConfirmSubscriptionModalOpen(true)
  }, DISPLAY_MODAL_TIMEOUT)
}

export const handleCreateSubscription = (
  dispatch: Dispatch,
  setConfirmSubscriptionModalOpen: React.Dispatch<boolean>,
  setSelectedDevelopers: React.Dispatch<DeveloperModel[]>,
) => (developer: DeveloperModel) => {
  dispatch(
    developerCreateSubscription({
      params: {
        developerId: developer.id || '',
        user: developer.email || '',
        applicationId: '', // TBC
        type: 'developerEdition',
      },
      onCreated: () => {
        setConfirmSubscriptionModalOpen(false)
        setSelectedDevelopers([])
      },
    }),
  )
}

export const DeveloperDesktopPage: React.FC<DeveloperDesktopPageProps> = () => {
  const [isDeveloperEditionModalOpen, setIsDeveloperEditionModalOpen] = React.useState<boolean>(false)
  const [isConfirmSubscriptionModalOpen, setConfirmSubscriptionModalOpen] = React.useState<boolean>(false)
  const [selectedDevelopers, setSelectedDevelopers] = React.useState<DeveloperModel[]>([])
  const dispatch = useDispatch()
  // For now just support 1 developer
  // We will support multiple developers after finish "organisations" feature
  const developer = selectedDevelopers.length > 0 ? selectedDevelopers[0] : undefined

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
        confirmSubscription={confirmSubscription(
          setIsDeveloperEditionModalOpen,
          setConfirmSubscriptionModalOpen,
          setSelectedDevelopers,
        )}
      />
      <DeveloperConfirmSubscription
        visible={isConfirmSubscriptionModalOpen}
        developer={developer}
        handleCreateSubscription={handleCreateSubscription(
          dispatch,
          setConfirmSubscriptionModalOpen,
          setSelectedDevelopers,
        )}
      />
    </ErrorBoundary>
  )
}

export default DeveloperDesktopPage
