import { InstallationModel, ReferralTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, memo, useMemo } from 'react'
import { BodyText } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'

interface ReferralsDisplayProps {
  installations: InstallationModel[]
  hasCurrentInstallations: boolean
}

/**
 * This is not ideal at all but not as expensive as it looks. In practice, there is only ever one active installation
 * so I only have to access the inner reduce funcs for a single installation as a return earlt in the first loop.
 * I then need to loop through meta data and then through allow array to match the ids to the referral type names.
 * Horrible but little other choice.
 */

export const handleReferralText =
  (installations: InstallationModel[], referralTypes: ReferralTypeModelPagedResult | null) => () => {
    return installations.reduce<string>((acc, next) => {
      if (next.status !== 'Active') return acc

      const newItem = next?.metadata?.reduce<string>((iAcc, iNext) => {
        const innerNewItem = iNext?.allow?.reduce<string>((jAcc, jNext) => {
          const name = referralTypes?._embedded?.find((type) => type.id === jNext)?.name ?? ''
          if (name && jAcc) return `${jAcc}, ${jNext} - ${name}`
          if (name) return `${jNext} - ${name}`
          return jAcc
        }, '')

        if (innerNewItem && iAcc) return `${iAcc}, ${innerNewItem}`
        if (innerNewItem) return innerNewItem
        return iAcc
      }, '')

      if (newItem && acc) return `${acc}, ${newItem}`
      if (newItem) return newItem
      return acc
    }, '')
  }

export const ReferralsDisplay: FC<ReferralsDisplayProps> = memo(({ installations, hasCurrentInstallations }) => {
  const [referralTypes] = useReapitGet<ReferralTypeModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getReferralTypes],
    queryParams: { pageSize: 100 },
    fetchWhenTrue: [hasCurrentInstallations],
  })

  const hasReferralText = useMemo(handleReferralText(installations, referralTypes), [installations, referralTypes])

  if (!hasReferralText) return null

  return (
    <>
      <BodyText hasGreyText>
        This app has requested to read &lsquo;Referral&rsquo; data. You selected at the point of installation that the
        app should be limited to accessing the following &lsquo;Referral Types&rsquo;:{' '}
        <strong>{hasReferralText}</strong>
      </BodyText>
    </>
  )
})
