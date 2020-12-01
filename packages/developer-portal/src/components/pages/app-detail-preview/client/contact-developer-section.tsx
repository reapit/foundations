import React from 'react'
import { H5, Grid, GridItem, Content } from '@reapit/elements'
import { link, linkNormal } from '@/styles/elements/link'
import { cx } from 'linaria'

export type ContactDeveloperSectionType = {
  contact: {
    developer?: string
    telephone?: string
    supportEmail?: string
    homePage?: string
  }
  hasGutter?: boolean
}

export const ContactDeveloperSection = ({
  contact: { developer, telephone, supportEmail, homePage },
}: ContactDeveloperSectionType) => {
  const isProd = window.reapit.config.appEnv === 'production'
  return (
    <>
      <Content>
        <H5 className={'mb-2'}>Developer Links</H5>
        <Grid>
          <GridItem>
            <p>{developer}</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <p>{telephone}</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <p>
              <a
                className={cx(link, linkNormal)}
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${supportEmail}`}
              >
                Support
              </a>
            </p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <p>
              <a className={cx(link, linkNormal)} href={homePage} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </p>
          </GridItem>
        </Grid>
        {!isProd && (
          <>
            <Grid>
              <GridItem>
                <p>
                  <a className={cx(link, linkNormal)} href={'#'}>
                    Pricing
                  </a>
                </p>
              </GridItem>
            </Grid>
            <Grid>
              <GridItem>
                <p>
                  <a className={cx(link, linkNormal)} href={'#'}>
                    Privacy Policy
                  </a>
                </p>
              </GridItem>
            </Grid>
            <Grid>
              <GridItem>
                <p>
                  <a className={cx(link, linkNormal)} href={'#'}>
                    Terms of Service
                  </a>
                </p>
              </GridItem>
            </Grid>
          </>
        )}
      </Content>
    </>
  )
}
