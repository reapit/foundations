import * as React from 'react'

export interface HeadingProps {
  className?: string
  isCentered?: boolean
}

export const H1: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h1 className={`title is-1 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h1>
)

export const H2: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h2 className={`title is-2 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h2>
)

export const H3: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h3 className={`title is-3 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h3>
)

export const H4: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h4 className={`title is-4 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h4>
)

export const H5: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h5 className={`title is-5 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h5>
)

export const H6: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h6 className={`title is-6 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h6>
)

export const SubTitleH1: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h1 className={`subtitle is-1 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h1>
)

export const SubTitleH2: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h2 className={`subtitle is-2 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h2>
)

export const SubTitleH3: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h3 className={`subtitle is-3 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h3>
)

export const SubTitleH4: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h4 className={`subtitle is-4 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h4>
)

export const SubTitleH5: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h5 className={`subtitle is-5 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h5>
)

export const SubTitleH6: React.SFC<HeadingProps> = ({ children, className = '', isCentered = false }) => (
  <h6 className={`subtitle is-6 ${className} ${isCentered ? 'has-text-centered' : ''}`}>{children}</h6>
)
