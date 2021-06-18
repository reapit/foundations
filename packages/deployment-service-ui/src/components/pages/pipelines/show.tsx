import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { pipelineServiceGet } from '@/platform-api/pipelines'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Breadcrumb, BreadcrumbItem, H1, Section } from '@reapit/elements'
import { Label, Loader } from '@reapit/elements/v3'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [pipeline, setPipeline] = useState<PipelineModelInterface | undefined>()
  const params = useParams<{ pipelineId: string }>()

  useEffect(() => {
    const fetchPipeline = async () => {
      setLoading(true)
      const serviceResponse = await pipelineServiceGet(connectSession as ReapitConnectSession, params.pipelineId)
      setLoading(false)
      if (serviceResponse) {
        setPipeline(serviceResponse)
      }
    }
    if (connectSession) {
      fetchPipeline()
    }
  }, [connectSession])

  return loading ? (
    <Loader />
  ) : pipeline ? (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={Routes.PIPELINES}>Pipelines</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent={true}>
          <a href="#">{pipeline?.name}</a>
        </BreadcrumbItem>
      </Breadcrumb>
      <Section>
        <H1>Pipeline {pipeline?.name}</H1>
        <Label>Package Manager</Label>
        <p>{pipeline?.packageManager}</p>
        <Label>Build Command</Label>
        <p>{pipeline?.buildCommand}</p>
        <Label>Repository</Label>
        <p>{pipeline?.repository}</p>
      </Section>
    </>
  ) : (
    <>
      <H1>No pipeline found</H1>
      <Link to={Routes.PIPELINES}>Back</Link>
    </>
  )
}
