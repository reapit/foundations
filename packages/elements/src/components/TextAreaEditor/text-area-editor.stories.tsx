import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { TextAreaEditor, TextAreaEditorProps } from '.'
import { Form, Formik } from 'formik'
import { Button } from '../Button'
import { Section } from '@/components/Layout'

const validate = (values) => {
  const errors = { description: '', text: '' }

  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.text) {
    errors.text = 'Required'
  }

  return errors
}

export default {
  title: 'Components/TextAreaEditor',
  component: TextAreaEditor,
}

export const SampleForm: Story<TextAreaEditorProps> = (args) => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <Formik
      initialValues={{ description: '', text: '' }}
      onSubmit={(values) => {
        console.log('Form Values', values)
      }}
      validate={validate}
    >
      <Form>
        <div className="column is-half-desktop">
          <TextAreaEditor {...args} />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  </Section>
)
SampleForm.args = {
  id: 'description',
  name: 'description',
  placeholder: 'Some text here',
  labelText: 'Description',
}
