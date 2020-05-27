import * as React from 'react'
import { Formik } from 'formik'
import {
  Form,
  Grid,
  GridItem,
  FormHeading,
  FormSubHeading,
  FormSection,
  Input,
  FlexContainerBasic,
} from '@reapit/elements'

export type DeveloperInviteMemberModalInnerProps = {}

export const DeveloperInviteMemberModalInner: React.FC<DeveloperInviteMemberModalInnerProps> = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {() => (
        <Form className="form">
          <Input
            id="text-1-section-1"
            type="text"
            placeholder="Some text here"
            name="text-1-section-1"
            labelText="Text"
          />
        </Form>
      )}
    </Formik>
  )
}

export default DeveloperInviteMemberModalInner
