import React, { FC, useCallback } from 'react'
import { Card } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppDetailModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { AcProcessType, DesktopLink } from '@reapit/utils-react'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { trackEventHandler } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { useReapitConnect } from '@reapit/connect-session'

export interface AppsSupportItemProps {
  app: AppSummaryModel
}

export const AppsSupportItem: FC<AppsSupportItemProps> = ({ app }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const email = connectSession?.loginIdentity.email
  const { id, name } = app

  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getAppById],
    uriParams: {
      appId: id,
    },
    fetchWhenTrue: [id],
  })

  const { developer, homePage, supportEmail, telephone, termsAndConditionsUrl, privacyPolicyUrl, pricingUrl } =
    appDetail ?? {}

  const trackVisitHomepage = useCallback(trackEventHandler(TrackingEvent.ClickVisitAppPage, true), [])
  const trackSupportEmail = useCallback(
    trackEventHandler(TrackingEvent.ClickSendSupportEmail, true, { clientId, email, supportEmail, appName: name }),
    [],
  )
  const trackViewTerms = useCallback(trackEventHandler(TrackingEvent.ClickViewTermsAndConditions, true), [])
  const trackViewPrivacyPolicy = useCallback(trackEventHandler(TrackingEvent.ClickViewPrivacyPolicy, true), [])
  const trackViewPricing = useCallback(trackEventHandler(TrackingEvent.ClickViewPricing, true), [])

  return (
    <Card
      hasListCard
      listCardHeading={name}
      listCardSubHeading={developer}
      listCardItems={[
        {
          listCardItemHeading: 'Website',
          listCardItemSubHeading: homePage ? (
            <DesktopLink
              onClick={trackVisitHomepage}
              uri={homePage}
              acProcess={AcProcessType.web}
              target="_blank"
              content={homePage}
            />
          ) : (
            'Not Supplied'
          ),
          listCardItemIcon: 'webInfographic',
        },
        {
          listCardItemHeading: 'Support Email',
          listCardItemSubHeading: supportEmail ? (
            <DesktopLink
              onClick={trackSupportEmail}
              uri={supportEmail}
              acProcess={AcProcessType.mail}
              consentModal={{
                title: 'Email enquiry',
                body: `Thank you for your interest in ‘${name}’, to make an enquiry please click ‘Continue’ below. We will launch your default mail client and your information will be shared with ‘${developer}’.`,
              }}
              target="_blank"
              content={supportEmail}
            />
          ) : (
            'Not Supplied'
          ),
          listCardItemIcon: 'mailInfographic',
        },
        {
          listCardItemHeading: 'Telephone',
          listCardItemSubHeading: telephone || 'Not Supplied',
          listCardItemIcon: 'phoneInfographic',
        },
        {
          listCardItemHeading: 'Terms and Conditions',
          listCardItemSubHeading: termsAndConditionsUrl ? (
            <DesktopLink
              onClick={trackViewTerms}
              uri={termsAndConditionsUrl}
              acProcess={AcProcessType.web}
              target="_blank"
              content={termsAndConditionsUrl}
            />
          ) : (
            'Not Supplied'
          ),
          listCardItemIcon: 'listInfographic',
        },
        {
          listCardItemHeading: 'Privacy Policy',
          listCardItemSubHeading: privacyPolicyUrl ? (
            <DesktopLink
              onClick={trackViewPrivacyPolicy}
              uri={privacyPolicyUrl}
              acProcess={AcProcessType.web}
              target="_blank"
              content={privacyPolicyUrl}
            />
          ) : (
            'Not Supplied'
          ),
          listCardItemIcon: 'shieldInfographic',
        },
        {
          listCardItemHeading: 'Pricing Policy',
          listCardItemSubHeading: pricingUrl ? (
            <DesktopLink
              onClick={trackViewPricing}
              uri={pricingUrl}
              acProcess={AcProcessType.web}
              target="_blank"
              content={pricingUrl}
            />
          ) : (
            'Free'
          ),
          listCardItemIcon: 'doorLockInfographic',
        },
      ]}
    />
  )
}
