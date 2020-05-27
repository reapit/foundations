import * as React from 'react'
import { FormSection, FormHeading, FormSubHeading, Grid, GridItem, Input, RadioSelect } from '@reapit/elements'

export type RedirectUriSectionProps = {
  authFlow?: string
  isPrivateApp?: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const RedirectUriSection: React.FC<RedirectUriSectionProps> = ({ authFlow, isPrivateApp, setFieldValue }) => {
  return (
    <FormSection>
      <Grid>
        <GridItem>
          <FormHeading>Redirect URI(s)</FormHeading>
          <FormSubHeading>
            Please enter a Redirect URI(s) to define the route Reapit Connect is permitted to redirect to after a
            successful authentication. The following formats are supported: https://, http:// (for localhost only) or
            your own custom URI schemes such as myapp://login. For multiple URI’s, separate using a comma.
          </FormSubHeading>
          <Input
            disabled={authFlow === 'clientCredentials'}
            dataTest="submit-app-redirect-uri"
            type="text"
            id="redirectUris"
            name="redirectUris"
            placeholder="Enter your Redirect URI(s)"
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <FormHeading>Sign Out URI(s)</FormHeading>
          <FormSubHeading>
            Please enter a Sign Out URI(s) to define the route Reapit Connect is permitted to redirect to after
            successfully logging out. The following formats are supported: https://, http:// (for localhost only) or
            your own custom URI schemes such as myapp://login. For multiple URI’s, separate using a comma.
          </FormSubHeading>
          <Input
            disabled={authFlow === 'clientCredentials'}
            dataTest="submit-app-signout-uris"
            type="text"
            id="signoutUris"
            name="signoutUris"
            placeholder="Enter your Sign Out URI(s)"
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <FormHeading>Private Apps</FormHeading>
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
            name="isPrivateApp"
            id="isPrivateApp"
          />
          <Input
            disabled={isPrivateApp === 'no'}
            dataTest="submit-app-limited-to-client-ids"
            type="text"
            id="limitToClientIds"
            name="limitToClientIds"
            placeholder={'Please enter the Customer ID. For multiple Customer ID’s, please separate using a comma'}
          />
        </GridItem>
      </Grid>
    </FormSection>
  )
}

export default RedirectUriSection
