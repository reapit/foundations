import { useNode, useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { elFlex, elFlex1, elFlexAlignCenter, elMr3, elMr6, elP3 } from '@reapit/elements'

import ArrowUp from '../../icons/arrow-up'
import Delete from '../../icons/delete'
import Move from '../../icons/move'
import { cursorMove, cursorPointer, textWhite } from '../styles'
import { componentSelected, indicator, littleButton } from './styles'
import { NAV_NODE } from '@/components/hooks/apps/node-helpers'
import { AddContainer } from './add-container'

export const RenderNode = ({ render, iframeRef }) => {
  const { id } = useNode()
  const { actions, query, isActive, enabled } = useEditor((state) => ({
    isActive: !!state.nodes[id]?.events.selected,
    enabled: state.options.enabled,
  }))

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    props,
    connectors: { drag },
    parent,
    actions: { setProp },
    isRoot,
  } = useNode((node) => {
    const nodeIsRoot = query.node(node.id).isRoot()
    let isDeletable = query.node(node.id).isDeletable() && node.id !== 'body' && node.id !== NAV_NODE && !nodeIsRoot
    if (isDeletable && node.data.custom.isDeletable) {
      isDeletable = node.data.custom.isDeletable(node)
    }

    return {
      isHover: node.events.hovered,
      dom: node.dom,
      name: node.data.custom.displayName || node.data.displayName,
      moveable: query.node(node.id).isDraggable() && node.id !== 'body' && node.id !== NAV_NODE && !nodeIsRoot,
      deletable: isDeletable,
      parent: node.data.parent,
      props: node.data.props,
      isRoot: nodeIsRoot,
    }
  })

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (isRoot) {
      return
    }

    if (isActive || isHover) {
      dom?.classList.add(componentSelected)
    } else {
      dom?.classList.remove(componentSelected)
    }
  }, [dom, isActive, isHover, isRoot])

  const container = iframeRef?.contentDocument?.body.querySelector('#page-container')

  const isBody = id === 'body'
  const isNavigation = id === NAV_NODE

  const shouldShowTab = Boolean((isHover || isActive) && !isRoot && !isBody && !isNavigation && enabled && container)

  return (
    <>
      {shouldShowTab &&
        dom &&
        ReactDOM.createPortal(
          <div
            /*
              // @ts-ignore */
            ref={currentRef}
            className={cx(indicator, elP3, elFlex, elFlexAlignCenter)}
            style={{
              top: 0,
              zIndex: 9999,
            }}
          >
            <h2 className={cx(elFlex1, elMr6)}>
              {props.typeName && props.typeName + ' '}
              {name}
            </h2>
            {moveable && (
              <>
                <a
                  title="Increase block width"
                  className={cx(littleButton, elMr3, textWhite)}
                  style={{ fontSize: 18, fontWeight: 800 }}
                  onClick={() => {
                    setProp((props) => {
                      props.width++
                      if (props.width > 12) {
                        props.width = 12
                      }
                    })
                  }}
                >
                  +
                </a>
                <a
                  title="Decrease block width"
                  className={cx(littleButton, elMr3, textWhite)}
                  style={{ fontSize: 18, fontWeight: 800 }}
                  onClick={() => {
                    setProp((props) => {
                      props.width--
                      if (props.width < 1) {
                        props.width = 1
                      }
                    })
                  }}
                >
                  —
                </a>
              </>
            )}
            {moveable && (
              <div
                className={cx(littleButton, elMr3, cursorMove)}
                /*
                  // @ts-ignore */
                ref={drag}
              >
                <Move />
              </div>
            )}
            <a
              className={cx(littleButton, elMr3, cursorPointer)}
              onClick={() => {
                actions.selectNode(parent ? parent : undefined)
              }}
            >
              <ArrowUp />
            </a>
            {deletable && (
              <a
                className={cx(littleButton, cursorPointer)}
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  actions.delete(id)
                }}
              >
                <Delete />
              </a>
            )}
          </div>,
          dom,
        )}
      <AddContainer nodeId={id}>{render}</AddContainer>
    </>
  )
}
