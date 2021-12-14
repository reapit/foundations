import { MultiSelectInput } from '@reapit/elements'
import React, { FC } from 'react'
import { StepFormContainer } from './__styles__'

export const PermissionsOptionsContent: FC = () => {
  return (
    <StepFormContainer>
      <MultiSelectInput
        id="select-permissions"
        options={[
          {
            name: 'Item one',
            value: 'item-one',
          },
          {
            name: 'Item two',
            value: 'item-two',
          },
          {
            name: 'Item three',
            value: 'item-three',
          },
        ]}
        defaultValues={['item-one']}
      />
    </StepFormContainer>
  )
}
