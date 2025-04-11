import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { BodyText, Button, FlexContainer } from '@reapit/elements'
import { useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { Platform } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'

interface CheckAWSButtonProps {
  appId: string
  status?: AWSStatus // Dependency injection for testing only
}

export enum AWSStatus {
  'Unfetched',
  'Fetching',
  'AWSOnly',
  'AllUsers',
}

const INSTALL_TOPICS = ['application.install', 'application.uninstall']
const FILTERED_CLIENT_IDS = ['SBOX']

export const handleSetWebHooksLoading = (setAwsStatus: Dispatch<SetStateAction<AWSStatus>>) => () => {
  setAwsStatus(AWSStatus.Fetching)
}

export const checkIsAws = (subscriptions: (Platform.WebhookModel & { customerIds?: string[] })[]): boolean => {
  const filtered = subscriptions.filter((subscription) => {
    const { topicIds, customerIds, active } = subscription
    const hasDataTopics = Boolean(topicIds?.filter((topic: string) => !INSTALL_TOPICS.includes(topic)).length)
    const hasCustomerSubs = Boolean(
      !customerIds?.length || customerIds?.filter((id: string) => !FILTERED_CLIENT_IDS.includes(id)).length,
    )

    return hasDataTopics && hasCustomerSubs && active
  })

  return Boolean(filtered.length)
}

export const handleSetAwsStatus =
  (subscriptions: Platform.WebhookModelPagedResult | null, setAwsStatus: Dispatch<SetStateAction<AWSStatus>>) => () => {
    if (subscriptions) {
      const isAws = checkIsAws(subscriptions?._embedded ?? [])
      setAwsStatus(isAws ? AWSStatus.AWSOnly : AWSStatus.AllUsers)
    } else {
      setAwsStatus(AWSStatus.Unfetched)
    }
  }

export const CheckAWSButton: FC<CheckAWSButtonProps> = ({ appId, status }) => {
  const [awsStatus, setAwsStatus] = useState<AWSStatus>(status ?? AWSStatus.Unfetched)

  const [subscriptions] = useReapitGet<Platform.WebhookModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getWebhookSubscriptions],
    queryParams: { applicationId: appId, pageSize: 999, active: true },
    fetchWhenTrue: [appId && awsStatus === AWSStatus.Fetching],
  })

  useEffect(handleSetAwsStatus(subscriptions, setAwsStatus), [subscriptions])

  if (awsStatus === AWSStatus.AWSOnly) {
    return (
      <FlexContainer isFlexAlignCenter>
        <BodyText hasGreyText hasNoMargin>
          AWS Customers Only
        </BodyText>
      </FlexContainer>
    )
  }

  return awsStatus === AWSStatus.AllUsers ? (
    <FlexContainer isFlexAlignCenter>
      <BodyText hasGreyText hasNoMargin>
        All Customers
      </BodyText>
    </FlexContainer>
  ) : (
    <Button
      intent="primary"
      loading={awsStatus === AWSStatus.Fetching}
      disabled={awsStatus === AWSStatus.Fetching}
      onClick={handleSetWebHooksLoading(setAwsStatus)}
    >
      Check AWS Only
    </Button>
  )
}
