import React, { FC } from 'react'
import { BodyText } from '@reapit/elements'
import { PipelineTabs } from './../pipeline-tabs'
import { PipelineConfigureForm } from './pipeline-configure-form'
import { useLocation } from 'react-router'

export const PipelineConfigure: FC = () => {
  const location = useLocation()
  return (
    <>
      {!location.pathname.includes('new') && <PipelineTabs />}
      <BodyText hasGreyText>
        Tell us about how we should build your application here. We assume that your application is a front end app and
        that, it uses either yarn or npm to run scripts declared in a package.json file. We assume also that your
        application is bundled and that bundle is output to a local directory that we can deploy for you.
      </BodyText>
      <PipelineConfigureForm />
    </>
  )
}
