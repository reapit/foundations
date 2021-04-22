import * as React from 'react'
import { ElLoaderContainer, ElLoaderLabel, ElLoader, ElLoaderMovingBar } from './__styles__'
import { elIsFullPage } from '../../styles-v3/base/states'

export interface ILoader extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  fullPage?: boolean
}

export const Loader: React.FC<ILoader> = ({ label, fullPage, ...rest }) => {
  return (
    <ElLoaderContainer className={fullPage ? elIsFullPage : ''}>
      {label && <ElLoaderLabel>{label}</ElLoaderLabel>}
      <ElLoader {...rest}>
        <ElLoaderMovingBar />
      </ElLoader>
    </ElLoaderContainer>
  )
}
