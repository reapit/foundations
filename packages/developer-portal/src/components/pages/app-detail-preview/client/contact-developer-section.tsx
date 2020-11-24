import React from 'react'
import { H5, Grid, GridItem, Content } from '@reapit/elements'
import { link } from '@/styles/elements/link'

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
              <a className={link} target="_blank" rel="noopener noreferrer" href={`mailto:${supportEmail}`}>
                Support
              </a>
            </p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <p>
              <a className={link} href={homePage} target="_blank" rel="noopener noreferrer">
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
                  <a className={link} href={'#'}>
                    Privacy Policy
                  </a>
                </p>
              </GridItem>
            </Grid>
            <Grid>
              <GridItem>
                <p>
                  <a className={link} href={'#'}>
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
