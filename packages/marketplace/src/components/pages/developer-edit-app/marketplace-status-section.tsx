import * as React from 'react'
import { FormSection, Grid, GridItem, Checkbox, FormSubHeading, FormHeading } from '@reapit/elements'

export type MarketplaceStatusSectionProps = {
  isSubmitRevision: boolean
}

const MarketplaceStatusSection: React.FC<MarketplaceStatusSectionProps> = ({ isSubmitRevision }) => {
  return (
    <FormSection>
      <FormHeading>Marketplace Status</FormHeading>
      <FormSubHeading>
        This section refers to the listing status in the Marketplace. If your App is an external application i.e. it is
        just an API feed app or is a web application that exists out of the Marketplace ecosystem, please select,
        &ldquo;Direct API&rdquo;. Your app will still need to be listed in the Marketplace and installed by clients so
        they can grant permissions however, it will not appear as a launchable app for users from the Marketplace. It is
        a hard requirement that launchable apps conform closely to our &ldquo;Elements&rdquo;, brand guidelines so if
        your app does not, please also select &ldquo;Direct API&rdquo;. When you have done your initial app submit,
        please return here to set the &ldquo;is Listed&rdquo; status to make the app installable for users.
      </FormSubHeading>
      <Grid>
        <GridItem>
          <Checkbox name="isDirectApi" labelText="Direct API" id="isDirectApi" />
        </GridItem>
        {isSubmitRevision && (
          <GridItem>
            <Checkbox name="isListed" labelText="Is Listed" id="isListed" />
          </GridItem>
        )}
      </Grid>
    </FormSection>
  )
}

export default MarketplaceStatusSection
