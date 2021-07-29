import React from 'react'
import { Link as RRLink } from 'react-router-dom'
import { getPages } from '../header/saveState'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container from './container'

const defaultProps = {
  destination: '/',
}

export const Link = (props) => {
  return (
    <RRLink to={props.destination}>
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
