import * as React from 'react'
import { Input, TextArea } from '@reapit/elements'
import { FIELD_NAMES } from './constants'

export const DeveloperInviteMemberModalInput: React.FC = () => {
  return (
    <>
      <Input id={FIELD_NAMES.NAME} type="text" placeholder="Name" name={FIELD_NAMES.NAME} required labelText="Name" />
      <Input
        id={FIELD_NAMES.EMAIL}
        type="email"
        placeholder="Email"
        name={FIELD_NAMES.EMAIL}
        required
        labelText="Email"
      />
      <TextArea
        id={FIELD_NAMES.MESSAGE}
        placeholder="Message"
        name={FIELD_NAMES.MESSAGE}
        labelText="Message (optional)"
      />
    </>
  )
}

export default DeveloperInviteMemberModalInput
