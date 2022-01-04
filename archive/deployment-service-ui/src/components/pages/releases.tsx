import { reapitConnectBrowserSession } from '@/core/connect-session'
import { releaseServicePaginate, releaseVersionDeploy } from '@/platform-api/releases'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { FlexContainerBasic, Section, notification } from '@reapit/elements-legacy'
import { Button, Table } from '@reapit/elements-legacy'
import { Loader, StatusIndicator, Title } from '@reapit/elements'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FlexContainer } from '@reapit/elements'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [releases, setReleases] = useState<any[]>([])
  const [deployLoading, setDeployLoading] = useState<string | undefined>()

  const { projectName } = useParams<{ projectName: string }>()

  useEffect(() => {
    const fetchReleases = async () => {
      setLoading(true)
      const serviceResponse = await releaseServicePaginate(connectSession as ReapitConnectSession, projectName)
      setLoading(false)
      if (serviceResponse) {
        setReleases([...releases, ...serviceResponse.items])
      }
    }
    if (connectSession) {
      fetchReleases()
    }
  }, [connectSession])

  const deployVersion = async ({ id, version, projectName }: { version: string; projectName: string; id: string }) => {
    if (deployLoading) {
      notification.info({
        message: 'Release already in progress',
      })
      return
    }

    if (connectSession === null) {
      return
    }

    setDeployLoading(id)

    notification.info({
      message: 'Started deployment',
    })

    await releaseVersionDeploy(connectSession, projectName, version)

    setReleases([
      ...releases.map((release) => {
        release.currentlyDeployed = release.id === id
        return release
      }),
    ])

    setDeployLoading(undefined)
    notification.success({
      message: 'Deployment complete',
    })
  }

  return (
    <Section>
      <Title>
        <FlexContainer isFlexAlignCenter>
          <StatusIndicator intent={'success'} />
          Releases - {projectName}
        </FlexContainer>
      </Title>
      <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
        {loading ? (
          <Loader />
        ) : (
          <Table
            data={releases}
            columns={[
              {
                Header: 'Version',
                accessor: 'version',
              },
              {
                Header: 'Deployed',
                Cell: ({ row }: { row: { original: any } }) => {
                  if (deployLoading && deployLoading === row.original.id) {
                    return (
                      <FlexContainer isFlexAlignCenter>
                        <StatusIndicator intent="critical" /> Deploying
                      </FlexContainer>
                    )
                  }

                  return (
                    row.original.currentlyDeployed && (
                      <FlexContainer isFlexAlignCenter>
                        <StatusIndicator intent="success" /> Current
                      </FlexContainer>
                    )
                  )
                },
              },
              {
                id: 'Deploy',
                Cell: ({ row }: { row: { original: any } }) => (
                  <Button
                    loading={typeof deployLoading !== 'undefined' && row.original.id === deployLoading}
                    variant="info"
                    onClick={() => {
                      deployVersion(row.original)
                    }}
                  >
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
