import * as React from 'react'
import {
  Form,
  Grid,
  GridItem,
  FormHeading,
  FormSubHeading,
  FormSection,
  Input,
  FlexContainerBasic,
  TextArea,
} from '@reapit/elements'
import { Formik } from 'formik'
import DeveloperInviteMemberModalFooter from './developer-invite-member-modal-footer'

export type DeveloperInviteMemberModalFormProps = {}

export const DeveloperInviteMemberModalForm: React.FC<DeveloperInviteMemberModalFormProps> = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <>
        <FlexContainerBasic hasBackground hasPadding flexColumn>
          <Form className="form">
            <Input
              id="developer-invite-name"
              type="text"
              placeholder="Name"
              name="developer-invite-name"
              labelText="Name*"
            />
            <Input
              id="developer-invite-email"
              type="email"
              placeholder="Email"
              name="developer-invite-email"
              labelText="Email"
            />
            <TextArea
              id="developer-invite-message"
              placeholder="message"
              name="developer-invite-message"
              labelText="Message (optional)"
            />
          </Form>

          <DeveloperInviteMemberModalFooter />
        </FlexContainerBasic>
      </>
    </Formik>
  )
}

export default DeveloperInviteMemberModalForm
