import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container, { ContainerProps } from './container'
import { Button, Loader, Table as ELTable, useSnack } from '@reapit/elements'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import { useObjectList } from '@/components/hooks/objects/use-object-list'
import { useEditor } from '@craftjs/core'
import { DestinationPage } from './link'
import { useObjectDelete } from '@/components/hooks/objects/use-object-mutate'
import { useHistory } from 'react-router'
import { uppercaseSentence } from './utils'

const defaultProps = {
  destination: '/',
}

interface TableProps extends ContainerProps {
  typeName?: string
  editPageId?: string
  showControls?: string
}

const ObjectTableCell = ({ firstName, lastName }: any) => {
  return (
    <span>
      {firstName} {lastName}
    </span>
  )
}

const DeleteButton = ({ disabled, typeName, id }: { disabled?: boolean; typeName: string; id: string | number }) => {
  const { mutateFunction, loading } = useObjectDelete(typeName)
  const { error, success } = useSnack()
  return (
    <Button
      disabled={disabled}
      loading={loading}
      intent="danger"
      onClick={(e) => {
        e.preventDefault()
        mutateFunction({ variables: { id } })
          .then(() => {
            success(`Deleted ${typeName}`)
          })
          .catch(() => {
            error(`Failed to delete ${typeName}`)
          })
      }}
    >
      Delete
    </Button>
  )
}

const Table = ({ typeName, editPageId, showControls, ...props }: TableProps) => {
  const { data, loading } = useObjectList(typeName)
  const history = useHistory()
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }))
  const rows =
    data &&
    typeName &&
    data.map((row) => {
      const cells = Object.entries(row)
        .map(([label, value]) => ({
          label: uppercaseSentence(label),
          value: typeof value === 'object' ? undefined : value,
          children: typeof value === 'object' ? <ObjectTableCell {...value} /> : undefined,
          narrowTable: {
            showLabel: true,
          },
        }))
        .filter((cell) => {
          return !cell.label.startsWith('__') && cell.label.toLowerCase() !== 'id'
        })

      if (!showControls) {
        return { cells }
      }

      return {
        cells: [
          ...cells,
          {
            label: 'Edit',
            children: (
              <Button
                disabled={isEditing}
                intent="secondary"
                onClick={() => {
                  if (editPageId) {
                    history.push(`${editPageId}?editObjectId=${row.id}`)
                  }
                }}
              >
                Edit
              </Button>
            ),
          },
          {
            label: 'Delete',
            children: <DeleteButton disabled={isEditing} id={row.id} typeName={typeName} />,
          },
        ],
      }
    })

  return (
    <Container {...props}>
      {loading && <Loader label="Loading" />}
      {typeName && <ELTable style={{ flex: 1 }} rows={rows} />}
      {!loading && !typeName && <div>No type selected</div>}
    </Container>
  )
}

const ContainerSettings = Container.craft.related.toolbar

const TableSettings = () => {
  const { data, loading } = useTypeList()

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
      <DestinationPage sectionTitle="Edit Page" propKey="editPageId" title="Edit Page" />
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
