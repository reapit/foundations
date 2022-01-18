import { useEditor, useNode } from '@craftjs/core'
import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container from './container'
import { usePageId } from '@/components/hooks/use-page-id'
import { useApp } from '@/components/hooks/apps/use-app'
import { LinkProps, Link as ELink } from './ejectable/link'
import { Label } from '@reapit/elements'

const defaultProps = {
  destination: '',
}

const Link = (props: LinkProps) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))
  const {
    connectors: { connect, drag },
  } = useNode()

  return <ELink {...props} ref={(ref) => ref && connect(drag(ref))} disabled={!enabled} />
}

const ContainerSettings = Container.craft.related.toolbar

export const DestinationPage = ({
  sectionTitle,
  propKey,
  title,
  createControl,
}: {
  sectionTitle?: string
  propKey: string
  title: string
  createControl?: React.ReactNode
}) => {
  const { appId } = usePageId()
  const { app } = useApp(appId)
  const propValue = useNode((node) => node.data.props[propKey])

  return (
    <ToolbarSection
      title={sectionTitle || 'Destination'}
      props={[propKey]}
      summary={(obj: any) => {
        return `link to ${obj[propKey] || ''}`
      }}
    >
      {((propValue && createControl) || !createControl) && (
        <ToolbarItem type={ToolbarItemType.Select} propKey={propKey} title={title}>
          {app?.pages.map(({ id: value, name: label }) => (
            <option key={value} value={value}>
              {label || 'Home'}
            </option>
          ))}
          <option value="">Select a page</option>
        </ToolbarItem>
      )}
      {createControl}
      <ToolbarItem type={ToolbarItemType.Select} title="Printable QR Code?" propKey={`${propKey}PrintableQR`}>
        <option value="true">Yes</option>
        <option value="">No</option>
      </ToolbarItem>
      <Label>QR Code Size</Label>
      <ToolbarItem type={ToolbarItemType.Number} propKey={`${propKey}PrintableQRSize`} />
    </ToolbarSection>
  )
}

export const LinkSettings = () => (
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
