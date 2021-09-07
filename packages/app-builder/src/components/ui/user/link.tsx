import { useEditor } from '@craftjs/core'
import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container from './container'
import { usePageId } from '@/components/hooks/use-page-id'
import { useApp } from '@/components/hooks/apps/use-app'
import { LinkProps, Link as ELink } from './ejectable/link'

const defaultProps = {
  destination: '/',
}

const Link = (props: LinkProps) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return <ELink {...props} disabled={!enabled} />
}

const ContainerSettings = Container.craft.related.toolbar

export const DestinationPage = ({
  sectionTitle,
  propKey,
  title,
}: {
  sectionTitle?: string
  propKey: string
  title: string
}) => {
  const { appId } = usePageId()
  const { app } = useApp(appId)

  return (
    <ToolbarSection
      title={sectionTitle || 'Destination'}
      props={['destination']}
      summary={({ destination }: any) => {
        return `link to ${destination || ''}`
      }}
    >
      <ToolbarItem type={ToolbarItemType.Select} propKey={propKey} title={title}>
        {app?.pages.map(({ id: value, name: label }) => (
          <option key={value} value={value}>
            {label || 'Home'}
          </option>
        ))}
        <option value="">Select a page</option>
      </ToolbarItem>
    </ToolbarSection>
  )
}

const LinkSettings = () => (
  <>
    <DestinationPage title="Link to" propKey="destination" />
    <ContainerSettings />
  </>
)

Link.craft = {
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: LinkSettings,
  },
}

export default Link
