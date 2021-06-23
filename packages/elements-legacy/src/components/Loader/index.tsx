import * as React from 'react'

export interface LoaderProps {
  body?: boolean
  dataTest?: string
}

export const Loader: React.FunctionComponent<LoaderProps> = ({ body = true, dataTest = '' }) => (
  <div className={`loader-spinner ${body ? 'body' : ''}`} data-test={dataTest}>
    <div />
    <div />
    <div />
    <div />
  </div>
)
