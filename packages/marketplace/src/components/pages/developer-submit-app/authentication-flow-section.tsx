import * as React from 'react'

import { FormSection, FormHeading, FormSubHeading, Grid, GridItem, RadioSelect } from '@reapit/elements'
import linkStyles from '@/styles/elements/link.scss?mod'

export type AuthenticationFlowSectionProps = {
  authFlow?: string
  isSubmitApp: boolean
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const AuthenticationFlowSection: React.FC<AuthenticationFlowSectionProps> = ({
  setFieldValue,
  authFlow,
  isSubmitApp,
}) => {
  return (
    <FormSection>
      <FormHeading>AUTHENTICATION FLOW *</FormHeading>
      <FormSubHeading>
        Please select an authentication flow for your application.{' '}
        <strong>You can only do this once when you submit your app</strong>. If your application is{' '}
        <strong>user facing</strong>, you should select &quot;Authorization Code&quot;. This will allow you to use our
        hosted authentication service, Reapit Connect. If you are developing a{' '}
        <strong>server-side machine to machine</strong> application such as a feed to another system, you should select
        &quot;Client Credentials&quot;.{' '}
        <strong>This flow must not be used for applications without a server-side component</strong>. For more
        information on authentication, see our platform documentation{' '}
        <a
          className={linkStyles.link}
          href="https://foundations-documentation.reapit.cloud/api/api-documentation#authentication"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{' '}
        before progressing.
      </FormSubHeading>
      <Grid>
        <GridItem>
          <RadioSelect
            setFieldValue={setFieldValue}
            state={authFlow}
            disabled={!isSubmitApp}
            options={[
              { label: 'AUTHORIZATION CODE (Reapit Connect)', value: 'authorisationCode' },
              { label: 'CLIENT CREDENTIALS', value: 'clientCredentials' },
            ]}
            name="authFlow"
            id="authFlow"
          />
        </GridItem>
      </Grid>
    </FormSection>
  )
}

export default AuthenticationFlowSection
