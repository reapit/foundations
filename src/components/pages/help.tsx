import * as React from 'react'
import { history } from '@/core/router'
import { Button, FlexContainerResponsive, Content, H3, FlexContainerBasic, GridItem, Grid } from '@reapit/elements'
import Routes from '@/constants/routes'
import { GoogleForm } from '@/constants/google-form'

export type HelpPageProps = {}

export const HelpPage: React.FC<HelpPageProps> = () => {
  const handleReportBug = () => {
    window.open(GoogleForm.BUG_REPORT, '_blank')
  }

  const handleRequestEndpoint = () => {
    window.open(GoogleForm.API_REQUEST, '_blank')
  }

  const handleGotoWelcomeGuide = () => {
    history.push(Routes.DEVELOPER_WELCOME)
  }

  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Help</H3>
          <Grid>
            <GridItem>
              <Button variant="primary" type="button" onClick={handleReportBug} data-testid="btnReportBug">
                Report Bug
              </Button>
              <Button variant="primary" type="button" onClick={handleRequestEndpoint} data-testid="btnRequestEndPoint">
                Request Endpoint
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={handleGotoWelcomeGuide}
                data-testid="btnGotoWelcomeGuide"
              >
                Welcome Guide
              </Button>
            </GridItem>
          </Grid>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default HelpPage
