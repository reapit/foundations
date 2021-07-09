import { reapitConnectBrowserSession } from '@/core/connect-session'
import { releaseServiceProjectPaginate } from '@/platform-api/releases'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { FlexContainerBasic, H3, Section } from '@reapit/elements-legacy'
import { Button, Table } from '@reapit/elements-legacy'
import { Loader } from '@reapit/elements'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Routes from '@/constants/routes'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    const fetchReleases = async () => {
      setLoading(true)
      const serviceResponse = await releaseServiceProjectPaginate(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setProjects([...projects, ...serviceResponse.items])
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
            data={projects}
            columns={[
              {
                Header: 'Name',
                Cell: ({ row }: { row: { original: any } }) => row.original,
              },
              {
                id: 'View',
                Cell: ({ row }: { row: { original: any } }) => (
                  <Link to={Routes.RELEASES.replace(':projectName', row.original)}>
                    <Button variant="primary">View</Button>
                  </Link>
                ),
              },
            ]}
          />
        )}
      </FlexContainerBasic>
    </Section>
  )
}
