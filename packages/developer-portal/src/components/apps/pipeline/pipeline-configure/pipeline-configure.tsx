import React, { FC } from 'react'
import { BodyText, Subtitle } from '@reapit/elements'
import { PipelineTabs } from './../pipeline-tabs'
import { PipelineConfigureForm } from './pipeline-configure-form'
import { useLocation } from 'react-router'

export const PipelineConfigure: FC = () => {
  const location = useLocation()
  return (
    <>
      {!location.pathname.includes('new') && <PipelineTabs />}
      <BodyText hasGreyText hasSectionMargin>
        Setup the configuration below so that the pipeline knows how to build your application. The pipeline assumes
        that your application is a frontend application that uses either yarn or npm to run scripts declared in a
        package.json file. It also assumes that your application is bundled, and that the bundle is output to a local
        directory from which it can be deployed.
      </BodyText>
      <BodyText hasGreyText>
        <strong>Deployment Branch</strong> is the branch from which push events will trigger a new deployment. typically
        main or master.
      </BodyText>
      <BodyText hasGreyText>
        <strong>Build Command</strong> will be executed to prepare the application bundle, and should match the
        appropriate script in package.json.
      </BodyText>
      <BodyText hasGreyText hasSectionMargin>
        <strong>Build Directory</strong> is the directory from which the bundle will be deployed, typically build or
        dist.
      </BodyText>
      <PipelineConfigureForm />
    </>
  )
}
