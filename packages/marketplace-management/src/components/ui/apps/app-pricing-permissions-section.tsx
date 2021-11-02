import { BodyText, Col, elMb11, Grid, Subtitle } from '@reapit/elements'
import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import React from 'react'

export interface AppPricingPermissionsProps {
  app: AppDetailModel
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
  isDesktop: boolean
}

export const getDocs = (isDesktop: boolean) => {
  return isDesktop
    ? 'agencycloud://process/webpage?url=https://marketplace-documentation.reapit.cloud/integration-types'
    : 'https://marketplace-documentation.reapit.cloud/integration-types'
}

export const getPricing = (isDesktop: boolean, pricingUrl: string) => {
  return isDesktop ? `agencycloud://process/webpage?url=${pricingUrl}` : pricingUrl
}

const AppPricingPermissionsSection: React.FC<AppPricingPermissionsProps> = ({
  app,
  isDesktop,
  desktopIntegrationTypes,
}) => {
  const { scopes = [], isFree, pricingUrl, developer, desktopIntegrationTypeIds } = app
  const userDesktopIntegrationTypes = desktopIntegrationTypes.filter((desktopIntegrationType) =>
    desktopIntegrationTypeIds?.includes(desktopIntegrationType.id ?? ''),
  )

  return (
    <>
      {userDesktopIntegrationTypes.length ? (
        <>
          <Subtitle>Desktop Integration</Subtitle>
          <BodyText hasGreyText>
            This app requires the following Desktop Integration. Some integration types may replace or change certain
            behaviours within Agency Cloud.
          </BodyText>
          <BodyText hasGreyText>
            For more information regarding Desktop Integration types, please{' '}
            <a href={getDocs(isDesktop)} target="_blank" rel="noopener noreferrer">
              click here
            </a>
          </BodyText>
          <Grid className={elMb11}>
            {userDesktopIntegrationTypes.map((integration) => (
              <Col key={integration.name}>{integration?.description ?? ''}</Col>
            ))}
          </Grid>
        </>
      ) : null}
      <Subtitle>Pricing Information</Subtitle>
      <div className={elMb11}>
        {isFree ? (
          <BodyText hasGreyText>{developer} have specified there is no cost for using this App/Integration.</BodyText>
        ) : pricingUrl ? (
          <>
            <BodyText hasGreyText>
              {developer} have specified that there is a cost for using this App/Integration, please{' '}
              <a href={getPricing(isDesktop, pricingUrl)} target="_blank" rel="noopener noreferrer">
                click here
              </a>{' '}
              to view their pricing information. You will be billed directly by {developer}.
            </BodyText>
            {developer !== 'Reapit Ltd' && (
              <BodyText hasGreyText>
                You will not be charged by Reapit Ltd for any costs associated with using this App/Integration.
              </BodyText>
            )}
          </>
        ) : (
          <BodyText hasGreyText>
            There may be a cost associated to using this App/Integration. However, this information has not yet been
            provided by {developer}. Please contact {developer} directly for information about pricing.
          </BodyText>
        )}
      </div>
      <>
        <Subtitle>Data Permissions</Subtitle>
        <BodyText hasGreyText>
          By installing this app, you are granting the following permissions to your data:
        </BodyText>
        {scopes.length && (
          <Grid className={elMb11}>
            <Col>Information about your organisation</Col>
            <Col>Names/email addresses of your users</Col>
            {scopes.map((scope) => (
              <Col key={scope.name}>{scope?.description ?? ''}</Col>
            ))}
          </Grid>
        )}
      </>
    </>
  )
}

export default AppPricingPermissionsSection
