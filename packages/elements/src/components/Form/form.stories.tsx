import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Grid, GridItem } from '../Layout'
import { FormSection, FormHeading, FormSubHeading } from '.'
import { LayoutProps } from '../Layout'
import { Formik, Form } from 'formik'
import { action } from '@storybook/addon-actions'
import { Input } from '../Input'
import { Editor } from '../Editor'
import { TextArea } from '../TextArea'
import { Checkbox } from '../Checkbox'

export default {
  title: 'Rereshed-Docs/FormLayout',
  component: FormSection,
  subComponents: { FormHeading, FormSubHeading },
}

export const FormHeading_: Story<LayoutProps> = (args) => <FormHeading {...args}>Form Heading Text</FormHeading>
FormHeading_.args = {}

export const FormSubHeading_: Story<LayoutProps> = (args) => (
  <FormSubHeading {...args}>Form SubHeading Text</FormSubHeading>
)
FormSubHeading_.args = {}

export const FormSection_: Story<LayoutProps> = (args) => <FormSection {...args}>Form section child</FormSection>
FormSection_.args = {}

export const CompleteFormExample: Story<LayoutProps> = () => (
  <Formik
    initialValues={{ text: '', email: '', password: '', tel: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form className="form">
      <Grid>
        <GridItem>
          <FormSection>
            <FormHeading>Section One</FormHeading>
            <FormSubHeading>Information about this section to help the user</FormSubHeading>
            <Input
              id="text-1-section-1"
              type="text"
              placeholder="Some text here"
              name="text-1-section-1"
              labelText="Text"
            />
            <Input id="email" type="email" placeholder="bob@acme.com" name="email" labelText="Email" />
            <Input id="tel" type="tel" placeholder="0800 800 800" name="tel" labelText="Telephone" />
          </FormSection>
          <FormSection>
            <FormHeading>Section Two</FormHeading>
            <FormSubHeading>Information about this section to help the user</FormSubHeading>
            <Input id="password" type="password" placeholder="********" name="password" labelText="Password" />
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="********"
              name="passwordConfirm"
              labelText="Password Confirm"
            />
          </FormSection>
        </GridItem>

        <GridItem>
          <FormSection>
            <FormHeading>Section Three</FormHeading>
            <FormSubHeading>Information about this section to help the user</FormSubHeading>
            <Input
              id="text-1-section-3"
              type="text"
              placeholder="Some text here"
              name="text-1-section-3"
              labelText="Text"
            />
            <div className="control">
              <label className="label">Label for editor</label>
              <Editor
                placeholder="Some text here"
                onChange={(html: string) => {
                  console.log(html)
                }}
              />
            </div>
          </FormSection>
          <FormSection>
            <FormHeading>Section Four</FormHeading>
            <FormSubHeading>Information about this section to help the user</FormSubHeading>
            <TextArea id="text" placeholder="Some text here" name="primary" labelText="Details" />
          </FormSection>
        </GridItem>
      </Grid>
      <FormSection>
        <FormHeading>Section Five</FormHeading>
        <FormSubHeading>Information about this section to help the user</FormSubHeading>
        <Grid>
          <GridItem>
            <Checkbox labelText="Permission1" id="Permission1" name="Permission1" />
            <Checkbox labelText="Permission5" id="Permission5" name="Permission5" />
          </GridItem>
          <GridItem>
            <Checkbox labelText="Permission2" id="Permission2" name="Permission2" />
            <Checkbox labelText="Permission6" id="Permission6" name="Permission6" />
          </GridItem>
          <GridItem>
            <Checkbox labelText="Permission3" id="Permission3" name="Permission3" />
            <Checkbox labelText="Permission7" id="Permission7" name="Permission7" />
          </GridItem>
          <GridItem>
            <Checkbox labelText="Permission4" id="Permission4" name="Permission4" />
            <Checkbox labelText="Permission8" id="Permission8" name="Permission8" />
          </GridItem>
        </Grid>
      </FormSection>
    </Form>
  </Formik>
)
CompleteFormExample.args = {}
