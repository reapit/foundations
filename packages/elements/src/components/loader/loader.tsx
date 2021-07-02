import React, { FC, HTMLAttributes } from 'react'
import { ElLoaderContainer, ElLoaderLabel, ElLoader, ElLoaderMovingBar } from './__styles__'
import { elIsFullPage } from '../../styles/states'

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  fullPage?: boolean
}

export const Loader: FC<LoaderProps> = ({ label, fullPage, ...rest }) => {
  return (
    <ElLoaderContainer className={fullPage ? elIsFullPage : ''}>
      {label && <ElLoaderLabel>{label}</ElLoaderLabel>}
      <ElLoader {...rest}>
        <ElLoaderMovingBar />
      </ElLoader>
    </ElLoaderContainer>
  )
}
