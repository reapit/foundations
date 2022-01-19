import React from 'react'
import { ElInputError } from './__styles__'

export interface InputErrorInterface {
  message: string
}

export const InputError = ({ message }: InputErrorInterface) => {
  return <ElInputError>{message}</ElInputError>
}
