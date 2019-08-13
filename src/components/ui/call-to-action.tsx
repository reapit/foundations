import * as React from 'react'
import bulma from '../../styles/vendor/bulma'
import CheckIcon from '@/components/svg/check'
import TimesIcon from '@/components/svg/times'
import styles from '@/styles/elements/call-to-action.scss?mod'

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
      <button data-test={buttonDataTest} className={`${bulma.button} ${bulma.isPrimary}`} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  )
}

export default CallToAction
