import React, { useState } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { Button } from '@reapit/elements'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { ApiKeyModal } from './api-key-modal'

export const ApiKeys = ({ email, developerId }: { email: string; developerId: string }) => {
  const [active, setActive] = useState<boolean>(false)

  const [member, loading] = useReapitGet<{ data: MemberModel[] }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getMember],
    uriParams: {
      developerId,
    },
    queryParams: {
      email,
    },
  })

  return (
    <>
      <Button intent="primary" onClick={() => setActive(true)}>
        Api Keys
      </Button>
      {active && !loading && member && (
        <ApiKeyModal developerId={member.data[0].developerId} email={email} onClose={() => setActive(false)} />
      )}
    </>
  )
}
