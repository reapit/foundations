import React, { useEffect, useState } from 'react'
import { ROOT_NODE, useEditor } from '@craftjs/core'
import {
  elFlex,
  elFlex1,
  elFlexColumn,
  elFlexRow,
  elHFull,
  elMAuto,
  elPb6,
  elPt9,
  elPx6,
  elWFull,
  Loader,
} from '@reapit/elements'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import IFrame from 'react-frame-component'

import Header from '../header'
import Sidebar from '../sidebar'

import { flexAlignStretch, hScreen, justifyStretch, overflowAuto, relative, transition } from '../styles'
import { InjectFrameStyles } from './inject-frame-styles'
import { usePageId } from '@/components/hooks/use-page-id'
import { usePageNodes } from '@/components/hooks/apps/use-app'
import { mergeNavIntoPage, nodesArrToObj, Node, nodesObjtoToArr } from '@/components/hooks/apps/node-helpers'
import { TABLET_BREAKPOINT } from './__styles__/media'
import { useZoom } from '@/components/hooks/use-zoom'
import { NewPage, NewPageType } from './new-page'
import { PageBuilderPlaceholder } from './page-builder-placeholder'
import { constructPageNodes } from '../construct-page-nodes'
import { useObjectMutate } from '@/components/hooks/objects/use-object-mutate'
import { useCreatePage, useUpdatePageNodes } from '@/components/hooks/apps/use-update-app'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  overflow: auto;
`

const validateNodes = (nodes: Node[]) => {
  nodes.forEach((node) => {
    if (node.parent && !nodes.some((n) => n.nodeId === node.parent)) {
      throw new Error(`Parent node ${node.parent} not found for node ${node.id}`)
    }
    if (!node.parent && node.nodeId !== ROOT_NODE) {
      throw new Error(`non-root node ${node.id} has no parent`)
    }
    if (node.nodes && !node.nodes.every((n) => nodes.some((nn) => nn.nodeId === n))) {
      throw new Error(`Child node ${node.id} has invalid children`)
    }
    if (typeof node.id !== 'string') {
      throw new Error(`Node ${node.id} has invalid id`)
    }
  })
}

export const Viewport = ({ children, iframeRef, deserialize, rendererDivRefHandler }) => {
  const [breakpoint, setBreakpoint] = useState(TABLET_BREAKPOINT)
  const { zoom } = useZoom()
  const [loadedPageId, setLoadedPageId] = useState<string | undefined>()

  const { appId, pageId, setPageId } = usePageId()
  const { nodes, loading } = usePageNodes(appId, pageId)

  const [showNewPage, setShowNewPage] = useState(false)
  const [newPage, setNewPage] = useState<Partial<NewPageType>>()
  const { parseReactElement } = useEditor((state, query) => ({
    parseReactElement: query.parseReactElement,
  }))
  const { args } = useObjectMutate(newPage?.pageType === 'table' ? 'list' : 'create', newPage?.entity)
  const { updatePageNodes } = useUpdatePageNodes(appId)
  const { createPage } = useCreatePage(appId)
  const [createNewPageLoading, setCreateNewPageLoading] = useState(false)

  useEffect(() => {
    setLoadedPageId(undefined)
  }, [pageId])

  useEffect(() => {
    if (loading) {
      return
    }
    if (nodes && pageId !== loadedPageId) {
      try {
        const pageNodes = mergeNavIntoPage(nodes)
        validateNodes(pageNodes)
        const nodesObj = nodesArrToObj(pageNodes)
        deserialize(nodesObj)
        setLoadedPageId(pageId)
      } catch (e) {
        console.error(e)
      }
    }
  }, [pageId, nodes, loading, loadedPageId])

  useEffect(() => {
    if (!showNewPage && pageId === '~' && !loading && !nodes?.length) {
      setShowNewPage(true)
    }
  }, [loading, nodes, pageId, showNewPage])

  return (
    <div className={cx(elFlex1, elFlexColumn, justifyStretch, hScreen)}>
      <Header breakpoint={breakpoint} setBreakpoint={setBreakpoint} showNewPage={() => setShowNewPage(true)} />
      <div className={cx(elFlex, elFlexRow)} style={{ height: 'calc(100vh - 56px)', width: '100vw' }}>
        <NewPage
          showNewPage={showNewPage}
          createNewPage={async ({ entity, fields, pageType }) => {
            setCreateNewPageLoading(true)
            try {
              const nodes = constructPageNodes(
                entity,
                pageType === 'table' ? 'list' : 'form',
                (element: any) => {
                  return parseReactElement(element).toNodeTree()
                },
                args,
                undefined,
                entity,
                'create',
                fields,
              )
              console.log(nodes)
              const pageName = `${entity} ${pageType === 'table' ? 'Table' : 'Create'}`
              const newApp = await createPage(pageName)
              const newPage = newApp.pages.find((page) => page.name === pageName)
              if (!newPage) {
                throw new Error(`Page ${pageName} not found`)
              }
              const nodesArr = nodesObjtoToArr(appId, newPage.id, nodes)
              await updatePageNodes(nodesArr, newPage.id)
              setPageId(newPage.id)
            } catch (e) {
              console.error(e)
            }

            setCreateNewPageLoading(false)
          }}
          onChange={setNewPage}
          createNewPageLoading={createNewPageLoading}
        />
        <Container>
          {showNewPage ? (
            <PageBuilderPlaceholder newPage={newPage} />
          ) : (
            <IFrame
              style={{
                transition: 'width 350ms',
                width: breakpoint,
                flex: 1,
                margin: 'auto',
              }}
              ref={iframeRef}
              head={
                <>
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                </>
              }
            >
              <div
                id="page-container"
                className={cx(elFlex, elFlex1, elHFull, elFlexColumn, elPx6)}
                style={{
                  transition: 'transform 350ms',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                }}
              >
                <div
                  id="craftjs-renderer"
                  className={cx(elFlex1, elHFull, elWFull, transition, elPb6, overflowAuto)}
                  ref={rendererDivRefHandler}
                >
                  <div className={cx(elFlex, elFlexRow, flexAlignStretch, relative, elPt9, elMAuto)}>
                    <InjectFrameStyles>{loading ? <Loader fullPage /> : children}</InjectFrameStyles>
                  </div>
                </div>
              </div>
            </IFrame>
          )}
        </Container>
        <Sidebar showNewPage={showNewPage} />
      </div>
    </div>
  )
}

const ConnectedViewport = ({ children, iframeRef }) => {
  const { connectors, actions } = useEditor()

  return (
    <Viewport
      iframeRef={iframeRef}
      deserialize={actions.deserialize}
      rendererDivRefHandler={(ref) => ref && connectors.select(connectors.hover(ref, ''), '')}
    >
      {children}
    </Viewport>
  )
}

export default ConnectedViewport
