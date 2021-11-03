import React, { FC, useRef, useState } from 'react'
import { Editor, Frame } from '@craftjs/core'
import { debounce } from 'throttle-debounce'

import { RenderNode } from '../ui/render-node'
import Viewport from '../ui/viewport'
import Container from '../ui/user/container'
import Text from '../ui/user/text'
import Link from '../ui/user/link'
import Context from '../ui/user/context'
import Table from '../ui/user/table'
import Form from '../ui/user/form'
import { getPageId, usePageId } from '../hooks/use-page-id'
import { useUpdatePage } from '../hooks/apps/use-update-app'
import { isInitialLoad, nodesObjtoToArr } from '../hooks/apps/node-helpers'
import { Page } from '../hooks/apps/fragments'
import { FormInput } from '../ui/user/form-input'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const iframeRef = useRef()
  const { updatePage } = useUpdatePage()
  const [isSaving, setIsSaving] = useState(false)
  const { pageId } = usePageId()
  const debouncedUpdatePage = debounce(1000, async (appId: string, page: Partial<Page>) => {
    setIsSaving(true)
    await Promise.all([updatePage(appId, page), new Promise((resolve) => setTimeout(resolve, 750))])
    setIsSaving(false)
  })
  return (
    <Editor
      resolver={{
        Text,
        Container,
        Link,
        Context,
        Table,
        Form,
        FormInput,
      }}
      onRender={(props) => <RenderNode {...props} iframeRef={iframeRef.current} />}
      onNodesChange={(query) => {
        const { pageId, appId } = getPageId()
        const nodesObj = query.getSerializedNodes()
        if (query.serialize() !== '{}' && !isInitialLoad(nodesObj)) {
          debouncedUpdatePage(appId, {
            id: pageId,
            nodes: nodesObjtoToArr(appId, pageId, nodesObj),
          })
        }
      }}
    >
      <Viewport isSaving={isSaving} iframeRef={iframeRef} key={pageId}>
        <Frame>
          <div />
        </Frame>
      </Viewport>
    </Editor>
  )
}

export default Authenticated
