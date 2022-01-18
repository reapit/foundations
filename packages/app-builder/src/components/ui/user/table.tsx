import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import Container from './container'
import { useEditor, useNode } from '@craftjs/core'
import { DestinationPage } from './link'
import { TableProps, Table as ETable } from './ejectable/table'
import { useSubObjects } from '@/components/hooks/objects/use-sub-objects'
import { useObjectSpecials } from '@/components/hooks/objects/use-object-specials'
import { useObjectSearch } from '@/components/hooks/objects/use-object-search'
import { getAvailableIntegrationsForArgs } from '@/core/desktop-integration'
import { useObjectList } from '@/components/hooks/objects/use-object-list'
import { useIntrospection } from '@/components/hooks/use-introspection'
import { CreatePage } from './create-page'

const defaultProps = {}

const Table = (props: TableProps) => {
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }))
  const {
    connectors: { connect, drag },
  } = useNode()

  return <ETable {...props} ref={(ref) => ref && connect(drag(ref))} disabled={isEditing} />
}

const ContainerSettings = Container.craft.related.toolbar

export const IntegrationLanding = ({ typeName }: { typeName: string | undefined }) => {
  const { args } = useObjectList(typeName)
  const { data } = useIntrospection()
  const integrations = args && data && getAvailableIntegrationsForArgs(args, data)
  const propKey = 'integrationLandingType'

  if (!integrations || !integrations.length) {
    return null
  }

  return (
    <ToolbarSection
      title={'Agency Cloud'}
      props={[propKey]}
      summary={(obj: any) => {
        return `Openable from Agency Cloud: ${obj[propKey] || ''}`
      }}
    >
      <ToolbarItem type={ToolbarItemType.Select} propKey={propKey} title="Openable from Agency Cloud">
        {integrations.map((integrationType) => (
          <option key={integrationType} value={integrationType}>
            {integrationType}
          </option>
        ))}
        <option value="">Select a page</option>
      </ToolbarItem>
    </ToolbarSection>
  )
}

const TableSettings = () => {
  const { data, loading } = useTypeList()
  const { typeName } = useNode((node) => node.data.props)
  const subobjects = useSubObjects(typeName)
  const { specials } = useObjectSpecials(typeName)
  const { available: searchAvailable } = useObjectSearch(typeName)
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
      <ToolbarSection
        title="Type Name"
        props={['typeName']}
        summary={({ typeName }: any) => {
          return `Table of ${typeName || ''}${typeName ? 's' : ''}`
        }}
      >
        <ToolbarItem type={ToolbarItemType.Select} propKey="typeName" title="Object Type">
          {(data || []).map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
          <option value="" disabled>
            {loading ? 'Loading...' : 'Select a Type'}
          </option>
        </ToolbarItem>
      </ToolbarSection>
      <DestinationPage
        sectionTitle="Edit Page"
        propKey="editPageId"
        title="Edit Page"
        createControl={
          <CreatePage typeName={typeName} operationType="update" onCreate={(pageId) => sp('editPageId', pageId)} />
        }
      />
      <IntegrationLanding typeName={typeName} />
      {subobjects.data.map((subobject) => (
        <DestinationPage
          sectionTitle={`${subobject.object.name} page`}
          propKey={`${subobject.object.name}Page`}
          key={subobject.object.name}
          title={`${subobject.object.name} page`}
          createControl={
            <CreatePage
              typeName={subobject.object.name}
              operationType="list"
              onCreate={(pageId) => sp(`${subobject.object.name}Page`, pageId)}
            />
          }
        />
      ))}
      {specials.map((special) => (
        <DestinationPage
          sectionTitle={`${special.name} page`}
          propKey={`${special.name}Page`}
          key={special.name}
          title={`${special.name} page`}
          createControl={
            <CreatePage
              typeName={typeName}
              operationType={special.name}
              onCreate={(pageId) => sp(`${special.name}Page`, pageId)}
            />
          }
        />
      ))}
      <ToolbarSection
        title="Controls"
        props={['showControls']}
        summary={({ showControls }: any) => {
          return `${showControls ? 'Show' : 'Hide'} Controls`
        }}
      >
        <ToolbarItem type={ToolbarItemType.Select} propKey="showControls" title="Show Controls?">
          <option value="true">Yes</option>
          <option value="">No</option>
        </ToolbarItem>
      </ToolbarSection>
      {searchAvailable && (
        <ToolbarSection
          title="Search"
          props={['showSearch']}
          summary={({ showSearch }: any) => {
            return `${showSearch ? 'Show' : 'Hide'} Search`
          }}
        >
          <ToolbarItem type={ToolbarItemType.Select} propKey="showSearch" title="Show Search?">
            <option value="true">Yes</option>
            <option value="">No</option>
          </ToolbarItem>
        </ToolbarSection>
      )}
    </>
  )
}

Table.craft = {
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: TableSettings,
  },
}

export default Table
