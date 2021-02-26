import { Content, FadeIn, GridFourCol, GridFourColItem, H5, Section } from '@reapit/elements'
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
    <FadeIn>
      <Section>
        <Content>
          {userDesktopIntegrationTypes.length ? (
            <>
              <H5 className="mb-2">Desktop Integration</H5>
              <p>
                This app requires the following Desktop Integration. Some integration types may replace or change
                certain behaviours within Agency Cloud.
              </p>
              <ul className="ml-4">
                {userDesktopIntegrationTypes.map((integration) => (
                  <li key={integration.name}>{integration?.description ?? ''}</li>
                ))}
              </ul>
              <p>
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
              </p>
            </>
          ) : null}
          <H5 className="mb-2">Pricing Information</H5>
          {isFree ? (
            <p>{developer} have specified there is no cost for using this App/Integration.</p>
          ) : pricingUrl ? (
            <>
              <p>
                {developer} have specified that there is a cost for using this App/Integration, please{' '}
                {isDesktop ? (
                  <a href={`agencycloud://process/webpage?url=${pricingUrl}`}>click here</a>
                ) : (
                  <a href={pricingUrl} target="_blank" rel="noopener noreferrer">
                    click here
                  </a>
                )}{' '}
                to view their pricing information. You will be billed directly by {developer}.
              </p>
              {developer !== 'Reapit Ltd' && (
                <p>You will not be charged by Reapit Ltd for any costs associated with using this App/Integration.</p>
              )}
            </>
          ) : (
            <p>
              There may be a cost associated to using this App/Integration. However, this information has not yet been
              provided by {developer}. Please contact {developer} directly for information about pricing.
            </p>
          )}
          <>
            <H5 className="mb-2">Data Permissions</H5>
            <p>By installing this app, you are granting the following permissions to your data:</p>
            <p>Information about your organisation and the names/email addresses of your users</p>
            {scopes.length && (
              <GridFourCol>
                {scopes.map((scope) => (
                  <GridFourColItem key={scope.name}>{scope?.description ?? ''}</GridFourColItem>
                ))}
              </GridFourCol>
            )}
          </>
        </Content>
      </Section>
    </FadeIn>
  )
}

export default AppPricingPermissionsSection
