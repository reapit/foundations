import * as React from 'react'
import { FormSection, FormHeading, FormSubHeading, Grid, GridItem, Input, RadioSelect } from '@reapit/elements'
import { formFields } from './form-schema/form-fields'
import { sortAppByDateInstalled } from '@/components/ui/developer-analytics/detailed/installation-app-section'

const { redirectUris, signoutUris, limitToClientIds, isPrivateApp: isPrivateAppForm } = formFields

export type RedirectUriSectionProps = {
  authFlow?: string
  isPrivateApp?: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const RedirectUriSection: React.FC<RedirectUriSectionProps> = ({ authFlow, isPrivateApp, setFieldValue }) => {
  const isRequired = authFlow !== 'clientCredentials'
  return (
    <FormSection>
      <Grid>
        <GridItem>
          <FormHeading>
            {redirectUris.label} {isRequired ? '*' : ''}
          </FormHeading>
          <FormSubHeading>
            Please enter a Redirect URI(s) to define the route Reapit Connect is permitted to redirect to after a
            successful authentication. The following formats are supported: https://, http:// (for localhost only) or
            your own custom URI schemes such as myapp://login. For multiple URI’s, separate using a comma.
          </FormSubHeading>
          <Input
            required={isRequired}
            disabled={!isRequired}
            dataTest="submit-app-redirect-uri"
            type="text"
            id={redirectUris.name}
            name={redirectUris.name}
            placeholder={redirectUris.placeHolder}
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <FormHeading>
            {signoutUris.label} {isRequired ? '*' : ''}
          </FormHeading>
          <FormSubHeading>
            Please enter a Sign Out URI(s) to define the route Reapit Connect is permitted to redirect to after
            successfully logging out. The following formats are supported: https://, http:// (for localhost only) or
            your own custom URI schemes such as myapp://login. For multiple URI’s, separate using a comma.
          </FormSubHeading>
          <Input
            required={isRequired}
            disabled={!isRequired}
            dataTest="submit-app-signout-uris"
            type="text"
            id={signoutUris.name}
            name={signoutUris.name}
            placeholder={signoutUris.placeHolder}
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <FormHeading>{isPrivateAppForm.label}</FormHeading>
          <FormSubHeading>
            If your App is a Private App and you would like it to only be visible to certain customers, please select
            ‘Yes’ below. You should then enter the ‘Customer ID’ of the customer(s) you wish to share your app with. If
            you select ‘No’, your App will be visible to all on the Marketplace. For multiple customers, please separate
            the Customer IDs using a comma, e.g. ABC, DEF.
          </FormSubHeading>
          <RadioSelect
            setFieldValue={setFieldValue}
            state={isPrivateApp}
            options={[
              { label: 'YES', value: 'yes' },
              { label: 'NO', value: 'no' },
            ]}
            name={isPrivateAppForm.name}
            id={isPrivateAppForm.name}
          />
          <Input
            disabled={isPrivateApp === 'no'}
            dataTest="submit-app-limited-to-client-ids"
            type="text"
            id={limitToClientIds.name}
            name={limitToClientIds.name}
            placeholder={limitToClientIds.placeHolder}
          />
          <FormSubHeading>
            This field is disabled during the beta period. Your app will be private by default as the Marketplace is not
            yet live. You will have the opportunity to make your app private via an edit before setting it to be
            &#34;Listed&#34; in the marketplace when we move from beta to production.
          </FormSubHeading>
        </GridItem>
      </Grid>
    </FormSection>
  )
}

export default RedirectUriSection
