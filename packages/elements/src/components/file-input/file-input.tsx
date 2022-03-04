import React, {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  forwardRef,
  LegacyRef,
  SetStateAction,
  useState,
} from 'react'
import { Button } from '../button'
import { ElFileInput, ElFileInputText, ElFileInputWrap } from './__styles__'

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileUpload?: (base64: string) => void
  placeholderText?: string
}

export type FileInputWrapped = React.ForwardRefExoticComponent<
  FileInputProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

export const handleFileChange = (
  setFileName: Dispatch<SetStateAction<string>>,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  onFileUpload?: (base64: string) => void,
) => (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target && event.target.files && event.target.files[0]) {
    const file = event.target.files[0]
    setFileName(file.name)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result
      if (onChange && typeof base64 === 'string') {
        onChange(({ target: { value: base64 } } as unknown) as ChangeEvent<HTMLInputElement>)
      }
      if (onFileUpload && typeof base64 === 'string') {
        onFileUpload(base64)
      }
    }
    reader.onerror = (error) => {
      console.error(`file upload error: ${error}`)
    }
  }
}

export const FileInput: FileInputWrapped = forwardRef(
  (
    { onChange, onFileUpload, placeholderText, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [fileUrl, setFileName] = useState<string>('')
    return (
      <ElFileInputWrap>
        <Button type="button" intent="low">
          Upload
        </Button>
        <ElFileInput
          type="file"
          {...rest}
          onChange={handleFileChange(setFileName, onChange, onFileUpload)}
          ref={ref as LegacyRef<HTMLInputElement>}
        />
        <ElFileInputText>{fileUrl ?? placeholderText ?? 'Upload File'}</ElFileInputText>
      </ElFileInputWrap>
    )
  },
)
