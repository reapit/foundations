import * as React from 'react'
import { H3, Button, Section } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import DeveloperEditonModal from '@/components/ui/developer-edition-modal'
import { DeveloperDesktopContentPartOne, DeveloperDesktopContentPartTwo } from './developer-desktop-content'

export type DeveloperDesktopPageProps = {}

export const handleToggleVisibleModal = (
  setIsDeveloperEditionModalOpen: React.Dispatch<boolean>,
  isVisible: boolean,
) => () => setIsDeveloperEditionModalOpen(isVisible)

export const DeveloperDesktopPage: React.FC<DeveloperDesktopPageProps> = () => {
  const [isDeveloperEditionModalOpen, setIsDeveloperEditionModalOpen] = React.useState<boolean>(false)

  return (
    <ErrorBoundary>
      <Section className="justify-between items-center" isFlex>
        <H3 className="mb-0">Desktop</H3>
        <Button
          type="button"
          variant="primary"
          onClick={handleToggleVisibleModal(setIsDeveloperEditionModalOpen, true)}
        >
          Developer Edition
        </Button>
      </Section>
      <Section>
        <DeveloperDesktopContentPartOne />
      </Section>
      <Section>
        <DeveloperDesktopContentPartTwo />
      </Section>
      <DeveloperEditonModal
        visible={isDeveloperEditionModalOpen}
        afterClose={handleToggleVisibleModal(setIsDeveloperEditionModalOpen, false)}
      />
    </ErrorBoundary>
  )
}

export default DeveloperDesktopPage
