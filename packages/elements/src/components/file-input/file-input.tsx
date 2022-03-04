import React, { forwardRef, LegacyRef } from 'react'
import { Button } from '../button'
import { ElFileInput, ElFileInputText, ElFileInputWrap } from './__styles__'

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export type FileInputWrapped = React.ForwardRefExoticComponent<
  FileInputProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

export const FileInput: FileInputWrapped = forwardRef(
  ({ ...rest }, ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>) => {
    return (
      <ElFileInputWrap>
        <Button type="button" intent="low">
          Upload
        </Button>
        <ElFileInput type="file" {...rest} ref={ref as LegacyRef<HTMLInputElement>} />
        <ElFileInputText>Hello World</ElFileInputText>
      </ElFileInputWrap>
    )
  },
)
