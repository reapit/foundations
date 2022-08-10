import { useEditor } from '@craftjs/core'
import { useCreatePage, useUpdatePageNodes } from '@/components/hooks/apps/use-update-app'
import { nodesObjtoToArr } from '@/components/hooks/apps/node-helpers'
import { usePageId } from '@/components/hooks/use-page-id'
import { useObjectMutate } from '@/components/hooks/objects/use-object-mutate'
import React, { useState } from 'react'
import { PlusButton } from '../components'
import { constructPageNodes } from '../construct-page-nodes'

export const CreatePage = ({
  typeName,
  operationType,
  onCreate,
}: {
  typeName: string | undefined
  operationType?: 'list' | string
  onCreate: (pageId: string) => void
}) => {
  const { appId, pageId: sourcePageId } = usePageId()
  const [loading, setLoading] = useState(false)
  const { updatePageNodes } = useUpdatePageNodes(appId)
  const { createPage } = useCreatePage(appId)
  const { args } = useObjectMutate(operationType || '', operationType ? typeName : undefined)
  const { parseReactElement } = useEditor((state, query) => ({
    parseReactElement: query.parseReactElement,
  }))

  const onClick = async () => {
    if (!typeName || !operationType) {
      return
    }
    setLoading(true)
    const pageId = [typeName, operationType].join('-')
    const app = await createPage(pageId)
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
      [operationType, typeName].join(' '),
    )
    await updatePageNodes(nodesObjtoToArr(appId, page.id, nodes), page.id)
    setLoading(false)
    onCreate(pageId)
  }

  return <PlusButton onClick={onClick} loading={loading} />
}
