import React from 'react'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'

import { H5, Content } from '@reapit/elements'

interface AppDetailSectionProps {
  headerText: string | React.ReactNode
  dataTest?: string
  isSidebar?: boolean
}

export const AppDetailSection: React.FC<AppDetailSectionProps> = ({
  headerText,
  children,
  dataTest = '',
  isSidebar = false,
}) => (
  <Content dataTest={dataTest}>
    <H5 className={isSidebar ? 'mb-2' : ''}>{headerText}</H5>
    {children}
  </Content>
)

export const Tag: React.FC = ({ children }) => <div className={styles.tag}>{children}</div>

export const ImageSection: React.FC<{ uri?: string; alt?: string }> = ({ uri, alt = '' }) => {
  return uri ? (
    <Content>
      <img src={uri} alt={alt} />
    </Content>
  ) : null
}
