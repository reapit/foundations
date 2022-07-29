import React, { forwardRef, useEffect, useState } from 'react'
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
import { ParsedArg } from '@/components/hooks/use-introspection/query-generators'
import { styled } from '@linaria/react'
import { getLabel, Input as FormInput } from './form-input'
import { useObject } from '@/components/hooks/objects/use-object'

export interface TableProps extends ContainerProps {
  typeName?: string
  editPageId?: string
  showControls?: string
  showSearch?: string
  excludedFields?: string[]
  [key: string]: any
}

const ObjectTableCell = ({ obj }: { obj: any }) => {
  const { object, loading } = useObject(obj?.__typename)
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
  if (loading) {
    return <Loader />
  }
  if (object) {
    return <span>{getLabel(obj, object.labelKeys)}</span>
  }
  return (
    <span>
      {Object.entries(obj)
        .filter(([key, value]) => {
          return !key.startsWith('_') && typeof value !== 'object' && key !== 'id'
        })
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

const isDateString = (value: any) => {
  return value && typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)
}

const dateToHuman = (date: any) => {
  if (!isDateString(date)) {
    return date
  }
  const d = new Date(date)
  return d.toLocaleString()
}

const getDataCells = (row: any, subobjectNames: string[]) =>
  Object.entries(row)
    .filter((entry) => shouldDisplay(entry, subobjectNames))
    .map(([label, value]) => {
      return {
        label: uppercaseSentence(label),
        value: (typeof value === 'object' ? undefined : dateToHuman(value)) as string,
        children: typeof value === 'object' ? <ObjectTableCell obj={value} /> : undefined,
        narrowTable: {
          showLabel: true,
        },
      }
    })

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

const argsToDefaultFilters = (args?: ParsedArg[]) => {
  if (!args) {
    return {}
  }
  const obj = {}
  args.forEach((arg) => {
    switch (arg.typeName) {
      case 'Int':
      case 'Float':
        obj[arg.name] = 0
        break
      case 'Boolean':
        obj[arg.name] = false
        break
      case 'String':
        obj[arg.name] = ''
        break
      case 'DateTime':
        obj[arg.name] = new Date()
        if (arg.name.toLowerCase() === 'end') {
          obj[arg.name].setHours(23, 59, 59, 999)
        }
        obj[arg.name] = obj[arg.name].toISOString().split('.')[0]
        break
      default:
        obj[arg.name] = null
    }
  })
  return obj
}

const FilterContainer = styled.div``

const Filters = ({
  filters,
  setFilters,
  args,
}: {
  filters: any
  setFilters: (filters: any) => void
  args?: ParsedArg[]
}) => {
  return (
    <FilterContainer>
      {args?.map((arg) => {
        const { name } = arg
        const value = filters[name]
        const setValue = (value: any) => {
          setFilters({ ...filters, [name]: value })
        }
        return (
          <FormInput input={arg} key={arg.name} value={value} onChange={(e) => setValue(e.target.value)} name={name} />
        )
      })}
    </FilterContainer>
  )
}

export const Table = forwardRef<HTMLDivElement, TableProps & { disabled?: boolean }>(
  ({ typeName, editPageId, showControls, disabled, showSearch, includedFields = [], ...props }, ref) => {
    const [filters, setFilters] = useState<Record<string, any>>({})
    const { data: listResults, loading: listLoading, args } = useObjectList(typeName, filters)
    const subobjects = useSubObjects(typeName)
    const [queryStr, setQueryStr] = useState('')
    const {
      available: searchAvailable,
      data: searchResults,
      loading: searchLoading,
    } = useObjectSearch(typeName, queryStr)
    const { specials } = useObjectSpecials(typeName)
    const { context } = usePageId()
    const loading = listLoading || searchLoading

    useEffect(() => {
      setFilters(argsToDefaultFilters(args))
    }, [args])

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
    const displayNothingFound = !loading && !firstRow && typeName
    const displayNoType = !typeName
    const displayNoResultsFound = searchAvailable && queryStr

    return (
      <ComponentWrapper {...props} ref={ref}>
        <div className={cx(elFlex, elFlex1, elFlexColumn)}>
          {displaySearch && (
            <Input type="text" placeholder="Search" value={queryStr} onChange={(e) => setQueryStr(e.target.value)} />
          )}
          {!!args?.length && <Filters args={args} filters={filters} setFilters={setFilters} />}
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
