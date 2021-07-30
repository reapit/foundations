import { useEditor } from '@craftjs/core'
import React from 'react'
import { Link as RRLink } from 'react-router-dom'
import { getPages } from '../header/saveState'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container, { ContainerProps } from './container'

const defaultProps = {
  destination: '/',
}

interface LinkProps extends ContainerProps {
  destination?: string
  context?: { [key: string]: any }
}

const qs = (query: { [key: string]: string }) => {
  return Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')
}

const Link = (props: LinkProps) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <RRLink
      to={{
        pathname: props.destination,
        search: props.context ? qs(props.context) : '',
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

const LinkSettings = () => (
  <>
    <ContainerSettings />
    <ToolbarSection
      title="Destination"
      props={['destination']}
      summary={({ destination }: any) => {
        return `link to ${destination || ''}`
      }}
    >
      <ToolbarItem type={ToolbarItemType.Select} propKey="destination" title="Link to">
        {getPages().map(({ id: value, name: label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
        <option value="">Select a page</option>
      </ToolbarItem>
    </ToolbarSection>
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
