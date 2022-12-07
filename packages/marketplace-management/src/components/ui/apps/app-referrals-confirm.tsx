import { AppDetailModel, ReferralTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import {
  BodyText,
  elMb5,
  elMb7,
  InputGroup,
  InputWrapFull,
  Loader,
  MultiSelectInput,
  MultiSelectOption,
} from '@reapit/elements'
import { MetaDataType } from './app-installation-confirmation-modal'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'

interface ReferralsConfirmationSelectionProps {
  setMetadata: Dispatch<SetStateAction<MetaDataType | null>>
  metadata: MetaDataType | null
  app: AppDetailModel
}

export const handleOnCheckboxChange =
  (setMetadata: Dispatch<SetStateAction<MetaDataType | null>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setMetadata(isChecked ? [] : null)
  }

export const handleOnChange =
  (setMetadata: Dispatch<SetStateAction<MetaDataType | null>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = event.target.value.split(',').filter(Boolean)

    if (newValues.length) {
      setMetadata([
        {
          service: 'referrals',
          field: 'referralTypeId',
          allow: newValues,
        },
      ])
    } else {
      setMetadata([])
    }
  }

export const ReferralsConfirmationSelection: FC<ReferralsConfirmationSelectionProps> = ({
  app,
  metadata,
  setMetadata,
}) => {
  const [referralTypes, referralTypesLoading] = useReapitGet<ReferralTypeModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getReferralTypes],
    queryParams: { pageSize: 100 },
    fetchWhenTrue: [metadata],
  })

  const hasReferrals = Boolean(app.scopes?.find((scope) => scope.name?.includes('referrals')))

  if (!hasReferrals) return null

  return (
    <>
      <BodyText hasGreyText>
        This app has requested to read &lsquo;Referral&rsquo; data. Before installation please select the referral types
        that this app will have access to. This defaults to &lsquo;All Referral Types&rsquo;, unless selected below.
      </BodyText>
      <InputWrapFull>
        <InputGroup
          className={elMb5}
          type="checkbox"
          label="Install for selected referrals only"
          checked={Boolean(metadata)}
          onChange={handleOnCheckboxChange(setMetadata)}
        />
      </InputWrapFull>
      <InputWrapFull>
        {referralTypes && metadata ? (
          <MultiSelectInput
            className={elMb7}
            id="select-referrals-to-install"
            onChange={handleOnChange(setMetadata)}
            noneSelectedLabel="Select at least one referral or un-tick the above checkbox to select all"
            options={
              referralTypes?._embedded?.map(({ name, id }) => ({
                name,
                value: id,
              })) as MultiSelectOption[]
            }
          />
        ) : referralTypesLoading ? (
          <Loader />
        ) : null}
      </InputWrapFull>
    </>
  )
}
