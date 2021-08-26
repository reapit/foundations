import qs from 'query-string'
import { useEditor } from '@craftjs/core'
import React from 'react'
import { Link as RRLink } from 'react-router-dom'
import { usePages } from '../header/saveState'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container, { ContainerProps } from './container'

const defaultProps = {
  destination: '/',
}

interface LinkProps extends ContainerProps {
  destination?: string
  context?: { [key: string]: any }
}

const Link = (props: LinkProps) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <RRLink
      to={{
        pathname: props.destination,
        search: props.context ? qs.stringify(props.context) : '',
      }}
      onClick={
        enabled
          ? (e) => {
              e.preventDefault()
              return false
            }
          : undefined
      }
    >
      <Container {...props} />
    </RRLink>
  )
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
  const pages = usePages()
  return (
    <ToolbarSection
      title={sectionTitle || 'Destination'}
      props={['destination']}
      summary={({ destination }: any) => {
        return `link to ${destination || ''}`
      }}
    >
      <ToolbarItem type={ToolbarItemType.Select} propKey={propKey} title={title}>
        {pages.map(({ id: value, name: label }) => (
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
