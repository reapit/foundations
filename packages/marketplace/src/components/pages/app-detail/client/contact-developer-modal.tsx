import React from 'react'
import { Button, Grid, GridItem, SubTitleH6, Modal } from '@reapit/elements'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'
import linkStyles from '@/styles/elements/link.scss?mod'

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

  return (
    <>
      <Button
        dataTest="btn-help"
        onClick={openContactModal(setVisible)}
        type="button"
        variant="primary"
        className={clientAppDetailStyles.needHelpButton}
      >
        NEED HELP?
      </Button>

      <Modal
        visible={visible}
        title={'Contact Details'}
        afterClose={closeContactModal(setVisible)}
        footerItems={
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
        <>
          <Grid>
            <GridItem>
              <SubTitleH6>Company name</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <p>{developer}</p>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Telephone Number</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <p>{telephone}</p>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Support Email</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <p>
                <a
                  className={linkStyles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:${supportEmail}`}
                >
                  {supportEmail}
                </a>
              </p>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Home Page</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <p>
                <a className={linkStyles.link} href={homePage} target="_blank" rel="noopener noreferrer">
                  {homePage}
                </a>
              </p>
            </GridItem>
          </Grid>
        </>
      </Modal>
    </>
  )
}
