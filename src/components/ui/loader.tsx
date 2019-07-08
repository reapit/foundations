import * as React from 'react'
import loaderStyles from '@/styles/blocks/loader.scss?mod'

const { loader } = loaderStyles

const Loader: React.FunctionComponent<{ body?: boolean }> = ({ body = true }) => (
  <div className={`${loader} ${body ? loaderStyles.body : ''}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default Loader
