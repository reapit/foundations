import React from 'react'
import {
  SelectBox,
  H3,
  FlexContainerBasic,
  FormSection,
  FormSubHeading,
  FlexContainerResponsive,
} from '@reapit/elements'
import { Form, Formik } from 'formik'

const DeveloperWebhooks = () => {
  return (
    <FlexContainerBasic hasPadding>
      <FlexContainerResponsive flexColumn hasBackground hasPadding>
        <H3>Manage Webhook Subscriptions</H3>
        <FormSection>
          <FormSubHeading>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore excepturi aliquam dolor, dolore placeat
            molestias illum quod quasi nihil. Modi consectetur praesentium sint quod qui quos soluta repellat porro
            minus.
          </FormSubHeading>
          <Formik initialValues={{ demo: null }} onSubmit={() => {}}>
            {() => (
              <Form>
                <SelectBox
                  helpText="Please select an App from the list below to view the associated Webhooks:"
                  name="demo"
                  options={[]}
                  labelText="App"
                  id="test"
                />
              </Form>
            )}
          </Formik>
        </FormSection>
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default DeveloperWebhooks
