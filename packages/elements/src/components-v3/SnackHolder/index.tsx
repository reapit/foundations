import React from 'react'
import { ElSnackHolder } from './__styles__'
import { Snack, ISnack } from '../Snack'

export interface ISnackHolder extends React.HTMLAttributes<HTMLDivElement> {
  snacks: ISnack[]
  removeSnackById?: (id: string) => void
}

export const SnackHolder: React.FC<ISnackHolder> = ({ snacks, removeSnackById, ...rest }) => {
  return (
    <ElSnackHolder {...rest}>
      {snacks &&
        snacks.map(({ text, _id, ...rest }) => (
          <Snack onRemove={() => _id && removeSnackById && removeSnackById(_id)} {...rest}>
            {text}
          </Snack>
        ))}
    </ElSnackHolder>
  )
}
