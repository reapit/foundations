import React from 'react'
import { StepBeforeYouStart } from './steps/step-before-you-start'
import { StepInputAppName } from './steps/step-input-app-name.tsx'
import { ModalProps } from '@reapit/elements'

export const SubmitAppModal: React.FC<ModalProps> = ({ visible, afterClose }) => {
  // if (!visible) {
  //   return null
  // }
  // return <StepBeforeYouStart visible={true} afterClose={afterClose} />
  return <StepInputAppName visible={true} afterClose={afterClose} />
}
