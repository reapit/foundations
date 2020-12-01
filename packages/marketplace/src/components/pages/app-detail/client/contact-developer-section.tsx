import React from 'react'
import { H5, Grid, GridItem, Content } from '@reapit/elements'
import { link, linkNormal } from '@/core/__styles__/elements'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'
import { cx } from 'linaria'

export type ContactDeveloperSectionType = {
  contact: {
    developer?: string
    telephone?: string
    supportEmail?: string
    homePage?: string
    pricingUrl?: string
    isFree?: boolean
    termsAndConditionsUrl?: string
    privacyPolicyUrl?: string
  }
  hasGutter?: boolean
}

export const ContactDeveloperSection = ({
  contact: {
    developer,
    telephone,
    supportEmail,
    homePage,
    isFree,
    privacyPolicyUrl,
    pricingUrl,
    termsAndConditionsUrl,
  },
}: ContactDeveloperSectionType) => {
  const isDesktop = getMarketplaceGlobalsByKey()
  return (
    <>
      <Content>
        <H5 className={'mb-2'}>Developer Links</H5>
        <Grid>
          <GridItem>
            <p>{developer}</p>
          </GridItem>
        </Grid>
        {telephone && (
          <Grid>
            <GridItem>
              <p>{telephone}</p>
            </GridItem>
          </Grid>
        )}
        {supportEmail && (
          <Grid>
            <GridItem>
              <p>
                {isDesktop ? (
                  <a className={cx(link, linkNormal)} href={`agencycloud://process/email?address=${supportEmail}`}>
                    Support
                  </a>
                ) : (
                  <a
                    className={cx(link, linkNormal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`mailto:${supportEmail}`}
                  >
                    Support
                  </a>
                )}
              </p>
            </GridItem>
          </Grid>
        )}
        {homePage && (
          <Grid>
            <GridItem>
              <p>
                {isDesktop ? (
                  <a className={cx(link, linkNormal)} href={`agencycloud://process/webpage?url=${homePage}`}>
                    Website
                  </a>
                ) : (
                  <a className={cx(link, linkNormal)} href={homePage} target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                )}
              </p>
            </GridItem>
          </Grid>
        )}
        {!isFree && pricingUrl && (
          <Grid>
            <GridItem>
              <p>
                {isDesktop ? (
                  <a className={cx(link, linkNormal)} href={`agencycloud://process/webpage?url=${pricingUrl}`}>
                    Pricing
                  </a>
                ) : (
                  <a className={cx(link, linkNormal)} href={pricingUrl} target="_blank" rel="noopener noreferrer">
                    Pricing
                  </a>
                )}
              </p>
            </GridItem>
          </Grid>
        )}
        {privacyPolicyUrl && (
          <Grid>
            <GridItem>
              <p>
                {isDesktop ? (
                  <a className={cx(link, linkNormal)} href={`agencycloud://process/webpage?url=${privacyPolicyUrl}`}>
                    Privacy Policy
                  </a>
                ) : (
                  <a className={cx(link, linkNormal)} href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                )}
              </p>
            </GridItem>
          </Grid>
        )}
        {termsAndConditionsUrl && (
          <Grid>
            <GridItem>
              <p>
                {isDesktop ? (
                  <a
                    className={cx(link, linkNormal)}
                    href={`agencycloud://process/webpage?url=${termsAndConditionsUrl}`}
                  >
                    Terms of Service
                  </a>
                ) : (
                  <a
                    className={cx(link, linkNormal)}
                    href={termsAndConditionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                )}
              </p>
            </GridItem>
          </Grid>
        )}
      </Content>
    </>
  )
}
