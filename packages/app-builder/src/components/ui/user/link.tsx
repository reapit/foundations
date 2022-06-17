import { useEditor, useNode } from '@craftjs/core'
import React from 'react'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import Container from './container'
import { usePageId } from '@/components/hooks/use-page-id'
import { useApp } from '@/components/hooks/apps/use-app'
import { LinkProps, Link as ELink } from './ejectable/link'
import { styled } from '@linaria/react'

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

const DestinationPageContainer = styled.div`
  display: flex;
  align-items: center;
`

export const DestinationPage = ({
  propKey,
  title,
  createControl,
}: {
  propKey: string
  title: string
  createControl?: React.ReactNode
}) => {
  const { appId } = usePageId()
  const { app } = useApp(appId)
  const propValue = useNode((node) => node.data.props[propKey])

  return (
    <DestinationPageContainer>
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
    </DestinationPageContainer>
  )
}

export const LinkSettings = () => (
  <>
    <DestinationPage title="Link to" propKey="destination" />
    <ContainerSettings />
  </>
)

Link.craft = {
  displayName: 'Link',
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: LinkSettings,
  },
}

export default Link
