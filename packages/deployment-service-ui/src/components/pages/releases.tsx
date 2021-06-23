import { reapitConnectBrowserSession } from '@/core/connect-session'
import { releaseServicePaginate } from '@/platform-api/releases'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { FlexContainerBasic, H3, Section } from '@reapit/elements-legacy'
import { Button, Table } from '@reapit/elements-legacy'
import { Loader } from '@reapit/elements'
import React, { useEffect, useState } from 'react'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [releases, setReleases] = useState<any[]>([])

  useEffect(() => {
    const fetchReleases = async () => {
      setLoading(true)
      const serviceResponse = await releaseServicePaginate(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setReleases([...releases, ...serviceResponse])
      }
    }
    if (connectSession) {
      fetchReleases()
    }
  }, [connectSession])

  return (
    <Section>
      <H3>Releases</H3>
      <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
        {loading ? (
          <Loader />
        ) : (
          <Table
            data={releases}
            columns={[
              {
                Header: 'Version',
                Cell: ({ row }: { row: { original: any } }) => {
                  const parts = row.original.split('/')
                  const version = parts.pop().split('.zip').shift()
                  return <span>{version}</span>
                },
              },
              {
                id: 'Deploy',
                Cell: ({ row }: { row: { original: any } }) => (
                  <Button variant="info">
                    {console.log(row)}
                    Release
                  </Button>
                ),
              },
            ]}
          />
        )}
      </FlexContainerBasic>
    </Section>
  )
}
