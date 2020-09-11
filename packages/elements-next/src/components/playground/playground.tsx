import * as React from 'react'
import { Playground as BasePlayGround, PlaygroundProps } from 'docz'
import { playground } from './__styles__/playground-styles'

const PlayGround: React.FC<PlaygroundProps> = ({ children, ...rest }) => {
  return (
    <div className={playground}>
      <BasePlayGround {...rest}>{children}</BasePlayGround>
    </div>
  )
}

export default PlayGround
