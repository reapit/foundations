import * as React from 'react'
import { Button, Alert, FlexContainerBasic, LevelRight } from '@reapit/elements'

type CTAType = 'success' | 'danger'

export interface CallToActionCardProps {
  type?: CTAType
  className?: string
  buttonText: string
  title: string
  isCard?: boolean
  isCenter?: boolean
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  dataTest?: string
  buttonDataTest?: string
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
}) => (
  <div className={className} data-test={dataTest}>
    <Alert className="mb-0" type={type} message={title} />
    <FlexContainerBasic hasPadding hasBackground flexColumn>
      <p>{children}</p>
      <LevelRight>
        <Button dataTest={buttonDataTest} variant="primary" type="button" onClick={onButtonClick as () => void}>
          {buttonText}
        </Button>
      </LevelRight>
    </FlexContainerBasic>
  </div>
)

export default CallToAction
