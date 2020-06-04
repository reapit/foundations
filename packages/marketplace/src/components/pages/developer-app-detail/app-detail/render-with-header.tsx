import React from 'react'
import { H5 } from '@reapit/elements'
import appDetailStyles from '@/styles/blocks/app-detail.scss?mod'

export const RenderWithHeader: React.FC<{ header: string; dataTest?: string; hasGutter?: boolean }> = ({
  header,
  children,
  dataTest = '',
  hasGutter = true,
}) => (
  <div data-test={dataTest} className={hasGutter ? appDetailStyles.gutter : ''}>
    <H5>{header}</H5>
    {children}
  </div>
)
