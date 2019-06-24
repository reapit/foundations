import * as React from 'react'
import StyledLoader, { StyledLoaderProps } from '../../styles/blocks/loader'

interface LoaderProps extends Partial<StyledLoaderProps> {}

const Loader: React.FunctionComponent<LoaderProps> = ({ body = true }) => (
  <StyledLoader body={body}>
    <div />
    <div />
    <div />
    <div />
  </StyledLoader>
)

export default Loader
