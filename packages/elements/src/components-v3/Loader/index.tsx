import * as React from 'react'
import { cx } from 'linaria'
import { ElLoader, ElLoaderMovingBar } from './__styles__'
import { elIsFullPage } from '../../styles-v3/base/states'

export interface ILoader extends React.HTMLAttributes<HTMLDivElement> {
  fullPage?: boolean
  className?: string
}

export const Loader: React.FC<ILoader> = ({ fullPage, className, ...rest }) => {
  const combinedClassname = cx(className, fullPage && elIsFullPage)

  return (
    <ElLoader className={combinedClassname} {...rest}>
      <ElLoaderMovingBar />
    </ElLoader>
  )
}
