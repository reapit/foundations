import React from 'react'
import { H3, Content } from '@reapit/elements'

export type DocumentationProps = {}

export const DocumentationPage: React.FC<DocumentationProps> = () => {
  return (
    <>
      <Content>
        <H3 isHeadingSection>Documentation</H3>
      </Content>
    </>
  )
}

export default DocumentationPage
