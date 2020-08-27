import React, { useEffect, useState } from 'react'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { H3, Content } from '@reapit/elements'
import ConfigForm from '../ui/config-form'
import { getNegotiatorOfficeId } from '@/util/negotiator-helper'

export type AuthenticatedProps = {}

export const Authenticated: React.FC<AuthenticatedProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [officeId, setOfficeId] = useState('')
  useEffect(() => {
    const fetchNegotiatorOfficeId = async () => {
      setOfficeId(await getNegotiatorOfficeId(connectSession as ReapitConnectSession))
    }
    if (connectSession) {
      fetchNegotiatorOfficeId()
    }
  }, [connectSession])

  if (officeId == '') {
    return <p>Loading...</p>
  }

  return (
    <>
      <Content>
        <H3 isHeadingSection>Property Projector</H3>
        <ConfigForm officeId={officeId} />
      </Content>
    </>
  )
}

export default Authenticated
