import React, { forwardRef } from 'react'
import {
  Button,
  elFlex,
  elFlex1,
  elFlexColumn,
  Icon,
  Input,
  Loader,
  RowProps,
  Table as ELTable,
  useSnack,
} from '@reapit/elements'
import { cx } from '@linaria/core'

import { ComponentWrapper, ContainerProps } from './container'
import { uppercaseSentence } from './utils'

import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObjectSearch } from '../../../hooks/objects/use-object-search'
import { useObjectDelete, useObjectUpdate } from '../../../hooks/objects/use-object-mutate'
import { lowercaseFirstLetter, useSubObjects } from '../../../../components/hooks/objects/use-sub-objects'
import { notEmpty } from '../../../../components/hooks/use-introspection/helpers'
import { usePageId } from '../../../../components/hooks/use-page-id'
import { useObjectSpecials } from '../../../../components/hooks/objects/use-object-specials'

export interface TableProps extends ContainerProps {
  typeName?: string
  editPageId?: string
  showControls?: string
  showSearch?: string
  excludedFields?: string[]
  [key: string]: any
}

const ObjectTableCell = ({ obj }) => {
  if (!obj) {
    return null
  }
  if (Array.isArray(obj)) {
    return (
      <>
        {obj.map((item: any, i: number) => (
          <React.Fragment key={i}>
            <ObjectTableCell key={item.id} obj={item} />
            {i !== obj.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
      </>
    )
  }
  if (typeof obj !== 'object') {
    return obj
  }
  return (
    <span>
      {Object.entries(obj)
        .filter(([key, value]) => !key.startsWith('_') && typeof value !== 'object' && key !== 'id')
        .map((kv) => kv[1])
        .join(' ')}
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
      <Icon icon="trashSystem" />
    </Button>
  )
}

const shouldDisplay = ([key, value]: [string, any | undefined | null], subobjectNames: string[]) => {
  const isHidden = key.startsWith('_')
  const isId = key === 'id'
  const isArray = value && Array.isArray(value)
  const isSubObject = isArray
    ? value.length > 0 && subobjectNames.includes(value[0].__typename)
    : value && notEmpty(value) && subobjectNames.includes(value.__typename)

  return !isHidden && !isId && !isSubObject
}

const getDataCells = (row: any, subobjectNames: string[]) =>
  Object.entries(row)
    .filter((entry) => shouldDisplay(entry, subobjectNames))
    .map(([label, value]) => ({
      label: uppercaseSentence(label),
      value: (typeof value === 'object' ? undefined : value) as string,
      children: typeof value === 'object' ? <ObjectTableCell obj={value} /> : undefined,
      narrowTable: {
        showLabel: true,
      },
    }))

const AdditionalCells = ({
  specialsAndSubobjects,
  props,
  rowId,
  typeName,
  context,
}: {
  specialsAndSubobjects: { name: string; label: string }[]
  props: Record<string, any>
  rowId: string
  typeName: string
  context: any
}) => {
  const { setPageId } = usePageId()
  return (
    <>
      {specialsAndSubobjects.map(({ name, label }) => {
        const pageId = props[`${name}Page`]
        if (!pageId) return null

        return (
          <React.Fragment key={label}>
            <Button
              key={name}
              onClick={() => {
                const ctx = {
                  ...context,
                  [lowercaseFirstLetter(`${typeName}Id`)]: rowId,
                }
                setPageId(pageId, ctx)
              }}
            >
              {label}
            </Button>
          </React.Fragment>
        )
      })}
    </>
  )
}

const Controls = ({
  typeName,
  disabled,
  editPageId,
  rowId,
}: {
  typeName?: string
  disabled?: boolean
  editPageId?: string
  rowId: string
}) => {
  const { available: deletionAvailable } = useObjectDelete(typeName)
  const { available: updateAvailable } = useObjectUpdate(typeName)
  const { setPageId } = usePageId()

  if (!typeName) {
    return null
  }

  return (
    <>
      {updateAvailable && (
        <Button
          disabled={disabled}
          intent="secondary"
          onClick={() => {
            if (editPageId) {
              setPageId(editPageId, {
                editObjectId: rowId,
              })
            }
          }}
        >
          <Icon icon="editSystem" />
        </Button>
      )}
      {deletionAvailable && <DeleteButton disabled={disabled} id={rowId} typeName={typeName} />}
    </>
  )
}

export const Table = forwardRef<HTMLDivElement, TableProps & { disabled?: boolean }>(
  ({ typeName, editPageId, showControls, disabled, showSearch, includedFields = [], ...props }, ref) => {
    const { data: listResults, loading: listLoading } = useObjectList(typeName)
    const subobjects = useSubObjects(typeName)
    const [queryStr, setQueryStr] = React.useState('')
    const {
      available: searchAvailable,
      data: searchResults,
      loading: searchLoading,
    } = useObjectSearch(typeName, queryStr)
    const { specials } = useObjectSpecials(typeName)
    const { context } = usePageId()
    const loading = listLoading || searchLoading

    const subobjectNames = subobjects.data.map(({ object: { name } }) => name)
    const specialsAndSubobjects = [
      ...specials.map(({ name }) => ({ name, label: uppercaseSentence(name) })),
      ...subobjects.data.map(({ object }) => ({
        name: object.name,
        label: `View ${uppercaseSentence(object.name)}s`,
      })),
    ]

    const data = searchResults || listResults
    const hasExpandableContent = !!specialsAndSubobjects.length || showControls

    let rows: RowProps[] | undefined
    if (data && typeName) {
      rows = data.map((row): RowProps => {
        const cells = getDataCells(row, subobjectNames)
          .filter(({ label }) =>
            includedFields.map((s) => s.toLowerCase()).includes(label.toLowerCase().split(' ').join('')),
          )
          .filter(notEmpty)

        const content = (
          <>
            <AdditionalCells
              context={context}
              rowId={row.id}
              typeName={typeName}
              props={props}
              specialsAndSubobjects={specialsAndSubobjects}
            />
            {showControls && (
              <Controls rowId={row.id} disabled={disabled} editPageId={editPageId} typeName={typeName} />
            )}
          </>
        )

        return {
          cells,
          expandableContent: hasExpandableContent
            ? {
                content,
              }
            : undefined,
        }
      })
    }

    const [firstRow] = rows || []

    const displaySearch = searchAvailable && showSearch
    const displayTable = typeName && firstRow
    const displayNothingFound = !loading && !firstRow
    const displayNoType = !typeName
    const displayNoResultsFound = searchAvailable && queryStr

    return (
      <ComponentWrapper {...props} ref={ref}>
        <div className={cx(elFlex, elFlex1, elFlexColumn)}>
          {displaySearch && (
            <Input type="text" placeholder="Search" value={queryStr} onChange={(e) => setQueryStr(e.target.value)} />
          )}
          {loading && !displayNoType && <Loader label="Loading" />}
          {displayTable && (
            <ELTable
              numberColumns={firstRow.cells.length + (showControls ? 1 : 0)}
              style={{ flex: 1, opacity: searchLoading ? 0.5 : 1, transition: '300ms opacity' }}
              rows={rows || undefined}
            />
          )}
          {displayNothingFound && displayNoResultsFound && <span>No results found</span>}
          {displayNothingFound && !displayNoResultsFound && <span>Nothing found</span>}
          {displayNoType && <div>Select a type from the sidebar.</div>}
        </div>
      </ComponentWrapper>
    )
  },
)
