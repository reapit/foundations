import { reapitConnectBrowserSession } from '@/core/connect-session'
import { releaseServicePaginate, releaseVersionDeploy } from '@/platform-api/releases'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { FlexContainerBasic, H3, Section } from '@reapit/elements-legacy'
import { Button, Table } from '@reapit/elements-legacy'
import { Loader, StatusIndicator } from '@reapit/elements'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// import useSnack from '@reapit/elements/src/hooks/use-snack'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [releases, setReleases] = useState<any[]>([])
  const [deployLoading, setDeployLoading] = useState<string | undefined>()

  const { projectName } = useParams<{ projectName: string }>()
  // const snack = useSnack()

  // console.log(snack)

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

  const deployVersion = ({ id, version, projectName }: { version: string; projectName: string; id: string }) => {
    if (deployLoading) {
      // TODO show toast message
      return
    }

    if (connectSession === null) {
      return
    }

    setDeployLoading(id)

    console.log(id, deployLoading)

    // snack.info('Started deployment')

    releaseVersionDeploy(connectSession, projectName, version)

    setDeployLoading(undefined)
    // snack.info('Deployment complete')

    // Set toast
  }

  return (
    <Section>
      <H3>
        <StatusIndicator intent={'success'} /> Releases - {projectName}
      </H3>
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
                Cell: ({ row }: { row: { original: any } }) =>
                  row.original.currentlyDeployed && (
                    <>
                      <StatusIndicator intent="success" /> current
                    </>
                  ),
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
