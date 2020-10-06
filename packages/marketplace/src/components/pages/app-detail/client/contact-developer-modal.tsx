import React from 'react'
import { Button, Grid, GridItem, SubTitleH6, Content, ModalV2 } from '@reapit/elements'
import * as linkStyles from '@/core/__styles__/elements'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'

export type ContactDeveloperSectionType = {
  contact: {
    developer?: string
    telephone?: string
    supportEmail?: string
    homePage?: string
  }
  hasGutter?: boolean
}

export const openContactModal = (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setVisible(true)
}

export const closeContactModal = (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setVisible(false)
}

export const ContactDeveloperSection = ({
  contact: { developer, telephone, supportEmail, homePage },
}: ContactDeveloperSectionType) => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const isDesktop = getMarketplaceGlobalsByKey()

  return (
    <>
      <Button dataTest="btn-help" onClick={openContactModal(setVisible)} type="button" variant="primary" fullWidth>
        NEED HELP?
      </Button>

      <ModalV2
        visible={visible}
        title={'Contact Details'}
        onClose={closeContactModal(setVisible)}
        footer={
          <Button
            dataTest="btn-close-modal"
            disabled={false}
            type="button"
            variant="primary"
            onClick={closeContactModal(setVisible)}
          >
            Close
          </Button>
        }
      >
        <Content>
          <Grid>
            <GridItem>
              <SubTitleH6>Company name</SubTitleH6>
            </GridItem>
            <GridItem>
              <p>{developer}</p>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Telephone Number</SubTitleH6>
            </GridItem>
            <GridItem>
              <p>{telephone}</p>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Support Email</SubTitleH6>
            </GridItem>
            <GridItem>
              <p>
                {isDesktop ? (
                  <a className={linkStyles.link} href={`agencycloud://process/email?address=${supportEmail}`}>
                    {supportEmail}
                  </a>
                ) : (
                  <a
                    className={linkStyles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`mailto:${supportEmail}`}
                  >
                    {supportEmail}
                  </a>
                )}
              </p>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Home Page</SubTitleH6>
            </GridItem>
            <GridItem>
              <p>
                {isDesktop ? (
                  <a className={linkStyles.link} href={`agencycloud://process/webpage?url=${homePage}`}>
                    {homePage}
                  </a>
                ) : (
                  <a className={linkStyles.link} href={homePage} target="_blank" rel="noopener noreferrer">
                    {homePage}
                  </a>
                )}
              </p>
            </GridItem>
          </Grid>
        </Content>
      </ModalV2>
    </>
  )
}
