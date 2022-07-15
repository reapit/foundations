import React, { FC } from 'react'
import { Card } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppDetailModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { openNewPage } from '../../utils/navigation'

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
          listCardItemSubHeading: homePage || 'Not Supplied',
          listCardItemIcon: 'webInfographic',
          onClick: homePage ? openNewPage(homePage) : undefined,
        },
        {
          listCardItemHeading: 'Support Email',
          listCardItemSubHeading: supportEmail || 'Not Supplied',
          listCardItemIcon: 'mailInfographic',
          onClick: supportEmail ? openNewPage(`mailto:${supportEmail}`) : undefined,
        },
        {
          listCardItemHeading: 'Telephone',
          listCardItemSubHeading: telephone || 'Not Supplied',
          listCardItemIcon: 'phoneInfographic',
        },
        {
          listCardItemHeading: 'Terms and Conditions',
          listCardItemSubHeading: termsAndConditionsUrl || 'Not Supplied',
          listCardItemIcon: 'listInfographic',
          onClick: termsAndConditionsUrl ? openNewPage(termsAndConditionsUrl) : undefined,
        },
        {
          listCardItemHeading: 'Privacy Policy',
          listCardItemSubHeading: privacyPolicyUrl || 'Not Supplied',
          listCardItemIcon: 'shieldInfographic',
          onClick: privacyPolicyUrl ? openNewPage(privacyPolicyUrl) : undefined,
        },
        {
          listCardItemHeading: 'Pricing Policy',
          listCardItemSubHeading: pricingUrl || 'Free',
          listCardItemIcon: 'doorLockInfographic',
          onClick: pricingUrl ? openNewPage(pricingUrl) : undefined,
        },
      ]}
    />
  )
}
