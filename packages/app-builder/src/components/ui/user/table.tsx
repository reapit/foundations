import React, { useEffect, useState } from 'react'
import { useEditor, useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import Container from './container'
import { DestinationPage } from './link'
import { TableProps, Table as ETable } from './ejectable/table'
import { useSubObjects } from '@/components/hooks/objects/use-sub-objects'
import { useObjectSpecials } from '@/components/hooks/objects/use-object-specials'
import { useObjectSearch } from '@/components/hooks/objects/use-object-search'
import { getAvailableIntegrationsForArgs } from '@/core/desktop-integration'
import { useObjectList } from '@/components/hooks/objects/use-object-list'
import { useIntrospection } from '@/components/hooks/use-introspection'
import { CreatePage } from './create-page'
import { TypeList } from './type-list'
import { useObject } from '@/components/hooks/objects/use-object'
import { ColumnControls } from './column-controls'

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

export const IntegrationLanding = ({ typeName }: { typeName: string | undefined }) => {
  const { args } = useObjectList(typeName)
  const { data } = useIntrospection()
  const integrations = args && data && getAvailableIntegrationsForArgs(args, data)
  const propKey = 'integrationLandingType'

  if (!integrations || !integrations.length) {
    return null
  }

  return (
    <>
      <ToolbarItem type={ToolbarItemType.Select} propKey={propKey} title="Openable from Agency Cloud">
        {integrations.map((integrationType) => (
          <option key={integrationType} value={integrationType}>
            {integrationType}
          </option>
        ))}
        <option value="">Select a page</option>
      </ToolbarItem>
    </>
  )
}

const TableSettings = () => {
  const { typeName, includedFields } = useNode((node) => node.data.props)
  const subobjects = useSubObjects(typeName)
  const { specials } = useObjectSpecials(typeName)
  const { available: searchAvailable } = useObjectSearch(typeName)
  const { object } = useObject(typeName)
  const {
    actions: { setProp },
  } = useNode()

  const [shouldUpdate, setShouldUpdate] = useState(false)

  const sp = (prop: string, value: any) => {
    setProp((props) => {
      props[prop] = value
      return props
    })
  }

  const availableFields = object?.object.fields || []

  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false)
      sp(
        'includedFields',
        availableFields.map((f) => f.name),
      )
    }
  }, [shouldUpdate])

  const updateIn100ms = () => {
    setTimeout(() => {
      setShouldUpdate(true)
    }, 100)
  }

  return (
    <>
      <TypeList onChange={updateIn100ms} />
      <DestinationPage
        propKey="editPageId"
        title="Edit Page"
        createControl={
          <CreatePage typeName={typeName} operationType="update" onCreate={(pageId) => sp('editPageId', pageId)} />
        }
      />
      <IntegrationLanding typeName={typeName} />
      {subobjects.data.map((subobject) => (
        <DestinationPage
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
      <ToolbarItem type={ToolbarItemType.Checkbox} propKey="showControls" title="Show action buttons" />
      {searchAvailable && <ToolbarItem type={ToolbarItemType.Checkbox} propKey="showSearch" title="Show search bar" />}
      <ColumnControls
        availableFields={availableFields}
        includedFields={includedFields}
        setIncludedFields={(fields: string[]) => sp('includedFields', fields)}
      />
    </>
  )
}

Table.craft = {
  name: 'Table',
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: TableSettings,
  },
}

export default Table
