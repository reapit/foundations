import { useApp } from '@/components/hooks/apps/use-app'
import { usePageId } from '@/components/hooks/use-page-id'
import { useNode } from '@craftjs/core'
import { InputGroup, Loader } from '@reapit/elements'
import React from 'react'
import { ToolbarSection } from '../toolbar'
import Container from './container'
import { NavbarProps, Navbar as ENavbar } from './ejectable/navbar'

const defaultProps = {
  destination: '',
}

const Navbar = (props: NavbarProps) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return <ENavbar {...props} ref={(ref) => ref && connect(drag(ref))} />
}

const ContainerSettings = Container.craft.related.toolbar

const PagesChooser = ({
  includedPageIds = [],
  setIncludedPageIds,
}: {
  includedPageIds?: string[]
  setIncludedPageIds: (pageIds: string[]) => void
}) => {
  const { appId } = usePageId()
  const { app, loading } = useApp(appId)

  if (loading) {
    return <Loader />
  }

  return (
    <ToolbarSection
      title="Pages"
      props={['includedPageIds']}
      summary={() => {
        return `Navbar with ${(includedPageIds || []).length} pages`
      }}
    >
      {app?.pages.map(({ id, name }) => (
        <div key={id}>
          <InputGroup
            type="checkbox"
            name={id}
            label={name}
            checked={includedPageIds.includes(id)}
            onChange={(e) => {
              const { checked } = e.target
              const newPageIds = checked ? [...includedPageIds, id] : includedPageIds.filter((f) => f !== id)
              setIncludedPageIds(newPageIds)
            }}
          />
        </div>
      ))}
    </ToolbarSection>
  )
}

const NavbarSettings = () => {
  const { includedPageIds } = useNode((node) => node.data.props)
  const {
    actions: { setProp },
  } = useNode()

  const sp = (prop: string, value: any) => {
    setProp((props) => {
      props[prop] = value
      return props
    })
  }

  return (
    <>
      <ContainerSettings />
      <PagesChooser
        includedPageIds={includedPageIds}
        setIncludedPageIds={(pageIds: string[]) => sp('includedPageIds', pageIds)}
      />
    </>
  )
}

Navbar.craft = {
  displayName: 'Navbar',
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: NavbarSettings,
  },
}

export default Navbar
