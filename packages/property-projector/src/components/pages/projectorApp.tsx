import React from 'react'
import { H3, Content } from '@reapit/elements'
import ConfigForm from '../ui/config-form'

export type ProjectorAppProps = {}

export const ProjectorApp: React.FC<ProjectorAppProps> = () => {
  return (
    <>
      <Content>
        <H3 isHeadingSection>Property Projector</H3>
        <ConfigForm />
      </Content>
    </>
  )
}

export default ProjectorApp
