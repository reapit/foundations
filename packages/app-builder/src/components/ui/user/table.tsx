import React, { useEffect, useState } from 'react'
import { useEditor, useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import Container from './container'
import { TableProps, Table as ETable } from './ejectable/table'
import { getAvailableIntegrationsForArgs } from '../../../core/desktop-integration'
import { useObjectList } from '../../../components/hooks/objects/use-object-list'
import { useIntrospection } from '../../../components/hooks/use-introspection'
import { CreatePage } from './create-page'
import { useObject } from '../../../components/hooks/objects/use-object'
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
  const { object } = useObject(typeName)
  const {
    actions: { setProp },
  } = useNode()

  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [showNewPage, setShowNewPage] = useState(false)

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

  return (
    <>
      <CreatePage
        typeName={typeName}
        onShowNewPageChange={setShowNewPage}
        onCreate={(pageId) => {
          sp('editPageId', pageId)
          sp('showControls', !!pageId)
          setShowNewPage(false)
        }}
      />
      {!showNewPage && (
        <>
          <ColumnControls
            availableFields={availableFields.map(({ name }) => ({ name, isRequired: false }))}
            includedFields={includedFields}
            setIncludedFields={(fields: string[]) => sp('includedFields', fields)}
          />
          <IntegrationLanding typeName={typeName} />
        </>
      )}
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
