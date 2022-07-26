import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@reapit/elements'
import { fetchWebookSubscriptions, WebhookModel } from '../../../services/webhooks'

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

export const checkIsAws = (subscriptions: WebhookModel[]): boolean => {
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
  (setAwsStatus: Dispatch<SetStateAction<AWSStatus>>, awsStatus: AWSStatus, appId: string) => () => {
    const getWebhookSubscriptions = async () => {
      const subscriptions = await fetchWebookSubscriptions({
        pageSize: 999,
        applicationId: [appId],
        active: true,
      })

      if (subscriptions) {
        const isAws = checkIsAws(subscriptions?._embedded ?? [])
        setAwsStatus(isAws ? AWSStatus.AWSOnly : AWSStatus.AllUsers)
      } else {
        setAwsStatus(AWSStatus.Unfetched)
      }
    }

    if (awsStatus === AWSStatus.Fetching) {
      getWebhookSubscriptions()
    }
  }

export const CheckAWSButton: FC<CheckAWSButtonProps> = ({ appId, status }) => {
  const [awsStatus, setAwsStatus] = useState<AWSStatus>(status ?? AWSStatus.Unfetched)

  useEffect(handleSetAwsStatus(setAwsStatus, awsStatus, appId), [awsStatus, appId])

  if (awsStatus === AWSStatus.AWSOnly) {
    return <>AWS Customers Only</>
  }

  return awsStatus === AWSStatus.AllUsers ? (
    <>All Customers</>
  ) : (
    <Button
      intent="primary"
      loading={awsStatus === AWSStatus.Fetching}
      disabled={awsStatus === AWSStatus.Fetching}
      onClick={handleSetWebHooksLoading(setAwsStatus)}
    >
      Check AWS
    </Button>
  )
}
