import * as React from 'react'
import { Button, Alert, FlexContainerBasic } from '@reapit/elements'

type CTAType = 'success' | 'danger'

export interface CallToActionCardProps {
  type?: CTAType
  className?: string
  buttonText?: string
  title: string
  isCard?: boolean
  isCenter?: boolean
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  dataTest?: string
  buttonDataTest?: string
  footerItems?: React.ReactNode
}

const CallToAction: React.FunctionComponent<CallToActionCardProps> = ({
  title,
  children,
  type = 'success',
  onButtonClick,
  buttonText,
  dataTest = '',
  buttonDataTest = '',
  className = '',
  footerItems,
}) => (
  <div className={className} data-test={dataTest}>
    <Alert className="mb-0" type={type} message={title} />
    <FlexContainerBasic hasPadding hasBackground flexColumn>
      <p>{children}</p>
      <div className="has-text-right">
        {footerItems ? (
          footerItems
        ) : (
          <Button dataTest={buttonDataTest} variant="primary" type="button" onClick={onButtonClick as () => void}>
            {buttonText}
          </Button>
        )}
      </div>
    </FlexContainerBasic>
  </div>
)

export default CallToAction
