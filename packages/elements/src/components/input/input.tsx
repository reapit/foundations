import * as React from 'react'
import { ElInput } from './__styles__'

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<IInput> = ({ ...rest }) => {
  return (
    <ElInput {...rest} />
  )
}

<label class="file">
  <input type="file" id="file" aria-label="File browser example">
  <span class="file-custom"></span>
</label>