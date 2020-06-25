import * as React from 'react'
import { Input, TextArea } from '@reapit/elements'
import { formFields } from './form-fields'

const { developerInviteNameField, developerInviteEmailField, developerInviteMessageField } = formFields

export const DeveloperInviteMemberModalInput: React.FC = () => {
  return (
    <>
      <Input
        id={developerInviteNameField.name}
        type="text"
        placeholder={developerInviteNameField.placeHolder}
        name={developerInviteNameField.name}
        required
        labelText={developerInviteNameField.label as string}
      />
      <Input
        id={developerInviteEmailField.name}
        type="email"
        placeholder={developerInviteEmailField.placeHolder}
        name={developerInviteEmailField.name}
        required
        labelText={developerInviteEmailField.label as string}
      />
      <TextArea
        id={developerInviteMessageField.name}
        placeholder={developerInviteMessageField.placeHolder}
        name={developerInviteMessageField.name}
        labelText={developerInviteMessageField.label as string}
      />
    </>
  )
}

export default DeveloperInviteMemberModalInput
