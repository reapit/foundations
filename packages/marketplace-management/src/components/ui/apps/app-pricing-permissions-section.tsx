import { BodyText, Col, Grid, Subtitle } from '@reapit/elements'
import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import React from 'react'

export interface AppPricingPermissionsProps {
  app: AppDetailModel
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
  isDesktop: boolean
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
          <BodyText>
            This app requires the following Desktop Integration. Some integration types may replace or change certain
            behaviours within Agency Cloud.
          </BodyText>
          <ul>
            {userDesktopIntegrationTypes.map((integration) => (
              <li key={integration.name}>{integration?.description ?? ''}</li>
            ))}
          </ul>
          <BodyText>
            For more information regarding Desktop Integration types, please{' '}
            {isDesktop ? (
              <a
                href={
                  'agencycloud://process/webpage?url=https://marketplace-documentation.reapit.cloud/integration-types'
                }
              >
                click here
              </a>
            ) : (
              <a
                href="https://marketplace-documentation.reapit.cloud/integration-types"
                target="_blank"
                rel="noopener noreferrer"
              >
                click here
              </a>
            )}
            .
          </BodyText>
        </>
      ) : null}
      <Subtitle>Pricing Information</Subtitle>
      {isFree ? (
        <BodyText>{developer} have specified there is no cost for using this App/Integration.</BodyText>
      ) : pricingUrl ? (
        <>
          <BodyText>
            {developer} have specified that there is a cost for using this App/Integration, please{' '}
            {isDesktop ? (
              <a href={`agencycloud://process/webpage?url=${pricingUrl}`}>click here</a>
            ) : (
              <a href={pricingUrl} target="_blank" rel="noopener noreferrer">
                click here
              </a>
            )}{' '}
            to view their pricing information. You will be billed directly by {developer}.
          </BodyText>
          {developer !== 'Reapit Ltd' && (
            <BodyText>
              You will not be charged by Reapit Ltd for any costs associated with using this App/Integration.
            </BodyText>
          )}
        </>
      ) : (
        <BodyText>
          There may be a cost associated to using this App/Integration. However, this information has not yet been
          provided by {developer}. Please contact {developer} directly for information about pricing.
        </BodyText>
      )}
      <>
        <Subtitle>Data Permissions</Subtitle>
        <BodyText>By installing this app, you are granting the following permissions to your data:</BodyText>
        <BodyText>Information about your organisation and the names/email addresses of your users</BodyText>
        {scopes.length && (
          <Grid>
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
