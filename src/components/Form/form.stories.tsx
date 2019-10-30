import React from 'react'
import { storiesOf } from '@storybook/react'
import { FlexContainerBasic, Grid, GridItem } from '../Layout'
import { FormSection, FormHeading, FormSubHeading } from '.'
import { Formik, Form } from 'formik'
import { action } from '@storybook/addon-actions'
import { Input } from '../Input'
import { Editor } from '../Editor'
import { TextArea } from '../TextArea'
import { Checkbox } from '../Checkbox'

export const FormExample: React.SFC = () => (
  <FlexContainerBasic hasBackground hasPadding>
    <Formik
      initialValues={{ text: '', email: '', password: '', tel: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
      render={() => (
        <Form className="form">
          <Grid>
            <GridItem>
              <FormSection>
                <FormHeading>Section One</FormHeading>
                <FormSubHeading>Information about this section to help the user</FormSubHeading>
                <Input id="text" type="text" placeholder="Some text here" name="text" labelText="Text" />
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
                  name="password"
                  labelText="Password Confirm"
                />
              </FormSection>
            </GridItem>

            <GridItem>
              <FormSection>
                <FormHeading>Section Three</FormHeading>
                <FormSubHeading>Information about this section to help the user</FormSubHeading>
                <Input id="text" type="text" placeholder="Some text here" name="text" labelText="Text" />
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
                <FormHeading>Section Three</FormHeading>
                <FormSubHeading>Information about this section to help the user</FormSubHeading>
                <TextArea id="text" placeholder="Some text here" name="primary" labelText="Details" />
              </FormSection>
            </GridItem>
          </Grid>
          <FormSection>
            <FormHeading>Section Four</FormHeading>
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
      )}
    />
    <FormSection></FormSection>
  </FlexContainerBasic>
)

storiesOf('Form', module).add('FormExample', () => <FormExample />)
