import * as React from 'react'
import { Form, Input, TextArea } from '@reapit/elements'

export type DeveloperInviteMemberModalFormProps = {}

export const DeveloperInviteMemberModalForm: React.FC<DeveloperInviteMemberModalFormProps> = () => {
  return (
    <Form className="form">
      <Input id="developerInviteName" type="text" placeholder="Name" name="developerInviteName" labelText="Name*" />
      <Input id="developerInviteEmail" type="email" placeholder="Email" name="developerInviteEmail" labelText="Email" />
      <TextArea
        id="developerInviteMessage"
        placeholder="Message"
        name="developerInviteMessage"
        labelText="Message (optional)"
      />
    </Form>
  )
}

export default DeveloperInviteMemberModalForm
