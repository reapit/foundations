import * as React from 'react'
import { cx } from 'linaria'
import { elLoaderContainer, elLoaderOverlay, elLoader } from './styles'

export type LoaderProps = {
  isLoading?: boolean
  wrapperClassName?: string
  size?: 'default' | 'small' | 'large'
  indicator?: React.ReactNode
  description?: string
}

export type RenderSpinnerParams = Pick<LoaderProps, 'isLoading' | 'indicator' | 'size' | 'description'>

export const renderSpinner = (params: RenderSpinnerParams) => {
  const { isLoading, size, indicator, description } = params

  return (
    <div className={cx(elLoader, size, isLoading && 'is-loading')}>
      {indicator ? (
        indicator
      ) : (
        <>
          <div />
          <div />
          <div />
          <div />
          {description && <p>{description}</p>}
        </>
      )}
    </div>
  )
}

export const Loader: React.FC<LoaderProps> = ({
  children,
  wrapperClassName,
  size = 'default',
  isLoading = true,
  indicator,
  description,
}) => {
  const spinner = renderSpinner({
    isLoading,
    size,
    indicator,
    description,
  })

  if (!children) {
    return isLoading ? <div className={wrapperClassName}>{spinner}</div> : null
  }

  return (
    <div className={cx(elLoaderContainer, isLoading && 'is-loading', wrapperClassName)}>
      {children}
      {spinner}
      <div className={elLoaderOverlay} />
    </div>
  )
}

export default Loader
