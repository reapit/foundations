import React from 'react'
import { ElSnackHolder } from './__styles__'
import { Snack, ISnack } from '../Snack'

export interface ISnackHolder extends React.HTMLAttributes<HTMLDivElement> {
  snacks: ISnack[]
}

export const SnackHolder: React.FC<ISnackHolder> = ({ snacks, ...rest }) => {
  return (
    <ElSnackHolder {...rest}>
      {snacks.map(({ text, ...rest }) => (
        <Snack {...rest}>{text}</Snack>
      ))}
    </ElSnackHolder>
  )
}
