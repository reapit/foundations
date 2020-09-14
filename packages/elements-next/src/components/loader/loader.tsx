import * as React from 'react'
import { cx } from 'linaria'
import { elLoader, elLoaderOverlay, elSpinner } from './__styles__/loader-styles'

export enum SpinnerSize {
  SMALL = 'small',
  DEFAILT = 'default',
  LARGE = 'large',
}

export type LoaderProps = {
  isLoading?: boolean
  wrapperClassName?: string
  size?: SpinnerSize
  indicator?: React.ReactNode
  description?: string
}

export type RenderSpinnerParams = Pick<LoaderProps, 'isLoading' | 'indicator' | 'size' | 'description'>

export const renderSpinner = (params: RenderSpinnerParams) => {
  const { isLoading, size, indicator, description } = params

  return (
    <div className={cx(elSpinner, size, isLoading && 'is-loading')}>
      {indicator ? (
        indicator
      ) : (
        <>
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          {description && <p>{description}</p>}
        </>
      )}
    </div>
  )
}

export const Loader: React.FC<LoaderProps> = ({
  children,
  wrapperClassName,
  size = SpinnerSize.DEFAILT,
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
    <div className={cx(elLoader, isLoading && 'is-loading', 'is-embedded', wrapperClassName)}>
      {children}
      <div className={elLoaderOverlay} />
      {spinner}
    </div>
  )
}

export default Loader
