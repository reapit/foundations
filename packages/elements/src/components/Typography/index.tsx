import * as React from 'react'
import { cx } from 'linaria'

export interface HeadingProps {
  className?: string
  isCentered?: boolean
  id?: string
  isHeadingSection?: boolean
}

export const H1: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h1
    id={id}
    className={cx(
      'title',
      'is-1',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h1>
)

export const H2: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h2
    id={id}
    className={cx(
      'title',
      'is-2',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h2>
)

export const H3: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h3
    id={id}
    className={cx(
      'title',
      'is-3',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h3>
)

export const H4: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h4
    id={id}
    className={cx(
      'title',
      'is-4',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h4>
)

export const H5: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h5
    id={id}
    className={cx(
      'title',
      'is-5',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h5>
)

export const H6: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h6
    id={id}
    className={cx(
      'title',
      'is-6',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h6>
)

export const SubTitleH1: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h1
    id={id}
    className={cx(
      'subtitle',
      'is-1',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h1>
)

export const SubTitleH2: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h2
    id={id}
    className={cx(
      'subtitle',
      'is-2',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h2>
)

export const SubTitleH3: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h3
    id={id}
    className={cx(
      'subtitle',
      'is-3',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h3>
)

export const SubTitleH4: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h4
    id={id}
    className={cx(
      'subtitle',
      'is-4',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h4>
)

export const SubTitleH5: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h5
    id={id}
    className={cx(
      'subtitle',
      'is-5',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h5>
)

export const SubTitleH6: React.SFC<HeadingProps> = ({
  children,
  className = '',
  id = '',
  isCentered = false,
  isHeadingSection = false,
}) => (
  <h6
    id={id}
    className={cx(
      'subtitle',
      'is-6',
      className && className,
      isCentered && 'has-text-centered',
      isHeadingSection && 'is-heading-section',
    )}
  >
    {children}
  </h6>
)
