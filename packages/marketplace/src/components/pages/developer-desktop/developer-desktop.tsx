import * as React from 'react'
import { FlexContainerBasic, FlexContainerResponsive, H3 } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import styles from '@/styles/pages/developer-desktop.scss?mod'

export type DeveloperDesktopPageProps = {}

export const DeveloperDesktopPage: React.FC<DeveloperDesktopPageProps> = () => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive className={styles.wrapDesktopPage} flexColumn hasBackground hasPadding>
          <H3>Desktop</H3>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default DeveloperDesktopPage
