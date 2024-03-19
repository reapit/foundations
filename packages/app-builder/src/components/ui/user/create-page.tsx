import { useEditor } from '@craftjs/core'
import { useCreatePage, useDeletePage, useUpdatePageNodes } from '../../../components/hooks/apps/use-update-app'
import { nodesObjtoToArr } from '../../../components/hooks/apps/node-helpers'
import { usePageId } from '../../../components/hooks/use-page-id'
import { useObjectMutate } from '../../../components/hooks/objects/use-object-mutate'
import React, { useEffect, useState } from 'react'
import { constructPageNodes } from '../construct-page-nodes'
import { useAppPages } from '../../../components/hooks/apps/use-app'
import { Button, elMb5 } from '@reapit/elements'
import { NewPage } from '../viewport/new-page'
import { styled } from '@linaria/react'

const StyledNewPage = styled(NewPage)`
  width: 100% !important;
  .el-wfull {
    padding: 0 !important;
  }
`

export const CreatePage = ({
  typeName,
  onCreate,
  onShowNewPageChange,
}: {
  onShowNewPageChange: (showNewPage: boolean) => void
  typeName: string
  onCreate: (pageId?: string) => void
}) => {
  const { appId, pageId: sourcePageId } = usePageId()
  const [loading, setLoading] = useState(false)
  const { updatePageNodes } = useUpdatePageNodes(appId)
  const { deletePage } = useDeletePage(appId)
  const { createPage } = useCreatePage(appId)
  const { pages } = useAppPages(appId)
  const operationType = 'update'
  const { args } = useObjectMutate(operationType, typeName)
  const { parseReactElement } = useEditor((state, query) => ({
    parseReactElement: query.parseReactElement,
  }))
  const pageId = [typeName, operationType].join('-')
  const exists = pages?.some((page) => page.id === pageId)

  const [showNewPage, setShowNewPage] = useState(false)

  useEffect(() => {
    onShowNewPageChange(showNewPage)
  }, [showNewPage])

  const createNewPage = async ({ fields }: { fields: string[] }) => {
    setLoading(true)
    const app = await createPage(pageId, typeName, 'update')
    const page = app.pages.find((page) => page.id === pageId)
    if (!page) {
      return
    }
    const nodes = constructPageNodes(
      typeName,
      operationType,
      (element: any) => {
        return parseReactElement(element).toNodeTree()
      },
      args,
      sourcePageId,
      pageId.split('-').join(' '),
      'update',
      fields,
    )
    await updatePageNodes(nodesObjtoToArr(appId, page.id, nodes), page.id)
    setLoading(false)
    onCreate(pageId)
  }

  return !showNewPage ? (
    <Button
      intent="primary"
      loading={loading}
      onClick={async () => {
        if (!exists) {
          setShowNewPage(!showNewPage)
        } else {
          if (confirm('are you sure?')) {
            await deletePage(pageId)
            onCreate()
          }
        }
      }}
      className={elMb5}
    >
      {exists ? 'Make Data Not Editable' : 'Make Data Editable'}
    </Button>
  ) : (
    <>
      <h1>Choose Fields</h1>
      <StyledNewPage
        onlyFields
        defaultPageType="form"
        typeName={typeName}
        createNewPage={async (page) => {
          await createNewPage(page)
          setShowNewPage(false)
        }}
        createNewPageLoading={loading}
        showNewPage
      />
    </>
  )
}
