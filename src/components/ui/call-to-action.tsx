import * as React from 'react'
import CheckIcon from '@/components/svg/check'
import TimesIcon from '@/components/svg/times'
import styles from '@/styles/elements/call-to-action.scss?mod'
import { Button } from '@reapit/elements'

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
  const iconStyle = type === 'success' ? styles.iconSuccess : styles.iconDanger
  const containerClassNames = [styles.container]
  isCard && containerClassNames.push(styles.isCard)
  isCenter && containerClassNames.push(styles.isCenter)
  className && containerClassNames.push(className)

  return (
    <div className={containerClassNames.join(' ')} data-test={dataTest}>
      <h3 className={styles.title}>
        <span className={`${styles.icon} ${iconStyle}`}>{type === 'success' ? <CheckIcon /> : <TimesIcon />}</span>
        <span>{title}</span>
      </h3>
      <p className={styles.message}>{children}</p>
      <Button dataTest={buttonDataTest} variant="primary" type="button" onClick={onButtonClick as () => void}>
        {buttonText}
      </Button>
    </div>
  )
}

export default CallToAction
