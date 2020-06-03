import React from 'react'
import { RenderWithHeader } from '@/components/pages/developer-app-detail/app-detail/render-with-header'
import { Button, Grid, GridItem, SubTitleH5, SubTitleH6, Modal } from '@reapit/elements'
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

export const ContactDeveloperSection = ({
  contact: { developer, telephone, supportEmail, homePage },
  hasGutter = true,
}: ContactDeveloperSectionType) => {
  const [visible, setVisible] = React.useState(false)

  const openContactModal = () => {
    setVisible(true)
  }

  const closeContactModal = () => {
    setVisible(false)
  }

  return (
    <RenderWithHeader hasGutter={hasGutter} header="Contact Developer">
      <Button
        dataTest="btn-help"
        onClick={openContactModal}
        type="button"
        variant="primary"
        className={clientAppDetailStyles.needHelpButton}
      >
        NEED HELP?
      </Button>

      <Modal
        visible={visible}
        title={'Contact Details'}
        afterClose={closeContactModal}
        footerItems={
          <>
            <Button
              dataTest="btn-close-modal"
              disabled={false}
              type="button"
              variant="primary"
              onClick={closeContactModal}
            >
              Close
            </Button>
          </>
        }
      >
        <>
          <Grid>
            <GridItem>
              <SubTitleH6>Company name</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <SubTitleH5>{developer}</SubTitleH5>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Telephone Number</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <SubTitleH5>{telephone}</SubTitleH5>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Support Emai</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <SubTitleH5>
                <a
                  className={linkStyles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:${supportEmail}`}
                >
                  {supportEmail}
                </a>
              </SubTitleH5>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <SubTitleH6>Home Page</SubTitleH6>
            </GridItem>
            <GridItem className={clientAppDetailStyles.developerContactModalRow}>
              <SubTitleH5>
                <a className={linkStyles.link} href={homePage} target="_blank" rel="noopener noreferrer">
                  {homePage}
                </a>
              </SubTitleH5>
            </GridItem>
          </Grid>
        </>
      </Modal>
    </RenderWithHeader>
  )
}
