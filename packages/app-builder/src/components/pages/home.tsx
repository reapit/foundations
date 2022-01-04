import React, { FC, useRef, useState } from 'react'
import { Editor, Frame } from '@craftjs/core'
import { debounce } from 'throttle-debounce'
import { useSnack } from '@reapit/elements'

import { RenderNode } from '../ui/render-node'
import Viewport from '../ui/viewport'
import Container from '../ui/user/container'
import Text from '../ui/user/text'
import Link from '../ui/user/link'
import Info from '../ui/user/info'
import Table from '../ui/user/table'
import Form from '../ui/user/form'
import QRCode from '../ui/user/qr-code'
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
  const { error } = useSnack()
  const debouncedUpdatePage = debounce(1000, async (appId: string, page: Partial<Page>) => {
    setIsSaving(true)
    try {
      await Promise.all([updatePage(appId, page), new Promise((resolve) => setTimeout(resolve, 750))])
    } catch (e: any) {
      error(e.message)
    }
    setIsSaving(false)
  })
  return (
    <Editor
      resolver={{
        Text,
        Container,
        Link,
        Info,
        Table,
        Form,
        FormInput,
        QRCode,
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
