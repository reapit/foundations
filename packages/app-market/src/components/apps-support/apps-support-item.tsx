import React, { FC } from 'react'
import { Card } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppDetailModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { AcProcessType, DesktopLink, useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'

export interface AppsSupportItemProps {
  app: AppSummaryModel
}

export const AppsSupportItem: FC<AppsSupportItemProps> = ({ app }) => {
  const { id, name } = app

  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: {
      appId: id,
    },
    fetchWhenTrue: [id],
  })

  const { developer, homePage, supportEmail, telephone, termsAndConditionsUrl, privacyPolicyUrl, pricingUrl } =
    appDetail ?? {}

  return (
    <Card
      hasListCard
      listCardHeading={name}
      listCardSubHeading={developer}
      listCardItems={[
        {
          listCardItemHeading: 'Website',
          listCardItemSubHeading: homePage ? (
            <DesktopLink uri={homePage} acProcess={AcProcessType.web} target="_blank" content={homePage} />
          ) : (
            'Not Supplied'
          ),
          listCardItemIcon: 'webInfographic',
        },
        {
          listCardItemHeading: 'Support Email',
          listCardItemSubHeading: supportEmail ? (
            <DesktopLink uri={supportEmail} acProcess={AcProcessType.mail} target="_blank" content={supportEmail} />
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
            <DesktopLink uri={pricingUrl} acProcess={AcProcessType.web} target="_blank" content={pricingUrl} />
          ) : (
            'Free'
          ),
          listCardItemIcon: 'doorLockInfographic',
        },
      ]}
    />
  )
}
