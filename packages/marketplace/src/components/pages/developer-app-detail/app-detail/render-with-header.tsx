import React from 'react'
import { H5 } from '@reapit/elements'
import appDetailStyles from '@/styles/blocks/app-detail.scss?mod'

export const RenderWithHeader: React.FC<{ header: string; dataTest?: string }> = ({
  header,
  children,
  dataTest = '',
}) => (
  <div data-test={dataTest} className={appDetailStyles.gutter}>
    <H5>{header}</H5>
    {children}
  </div>
)
