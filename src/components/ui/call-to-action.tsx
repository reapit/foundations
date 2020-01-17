import * as React from 'react'
import styles from '@/styles/elements/call-to-action.scss?mod'
import { Alert, Button } from '@reapit/elements'

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
  className,
  buttonText,
  isCard = false,
  isCenter = false,
  dataTest = '',
  buttonDataTest = ''
}) => {
  const containerClassNames = [styles.container]
  isCard && containerClassNames.push(styles.isCard)
  isCenter && containerClassNames.push(styles.isCenter)
  className && containerClassNames.push(className)

  return (
    <div className={containerClassNames.join(' ')} data-test={dataTest}>
      <Alert className="mb-0" type={type} message={title} />
      <div className={styles.content}>
        <p className={styles.message}>{children}</p>
        <Button dataTest={buttonDataTest} variant="primary" type="button" onClick={onButtonClick as () => void}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default CallToAction
