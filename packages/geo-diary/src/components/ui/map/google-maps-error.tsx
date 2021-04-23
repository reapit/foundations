import React, { FC } from 'react'
import { AppNavContainer, FlexContainerResponsive, Helper, Section } from '@reapit/elements'

export const GoogleMapsError: FC = () => (
  <AppNavContainer>
    <FlexContainerResponsive>
      <Section>
        <Helper>There was a problem loading Google Maps. Please try refreshing your page</Helper>
      </Section>
    </FlexContainerResponsive>
  </AppNavContainer>
)
