import * as React from 'react'
import { Dispatch } from 'redux'
import { FlexContainerBasic, FlexContainerResponsive, H3, LevelRight, Button } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import styles from '@/styles/pages/developer-desktop.scss?mod'
import DeveloperEditonModal from '@/components/ui/developer-edition-modal'

export type DeveloperDesktopPageProps = {}

export const handleToggleVisibleModal = (
  setIsDeveloperEditionModalOpen: React.Dispatch<boolean>,
  isVisible: boolean,
) => () => setIsDeveloperEditionModalOpen(isVisible)

export const DeveloperDesktopPage: React.FC<DeveloperDesktopPageProps> = () => {
  const [isDeveloperEditionModalOpen, setIsDeveloperEditionModalOpen] = React.useState<boolean>(false)

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
      />
    </ErrorBoundary>
  )
}

export default DeveloperDesktopPage
