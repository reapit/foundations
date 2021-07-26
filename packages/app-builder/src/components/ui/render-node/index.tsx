import { useNode, useEditor } from '@craftjs/core'
import { ROOT_NODE } from '@craftjs/utils'
import React, { useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { elFlex, elFlex1, elFlexAlignCenter, elMr2, elMr4, elP2 } from '@reapit/elements'

import ArrowUp from '../../icons/arrow-up'
import Delete from '../../icons/delete'
import Move from '../../icons/move'
import { cx } from '@linaria/core'
import { cursorMove, cursorPointer, textWhite } from '../styles'
import { componentSelected, indicator, littleButton } from './styles'

export const RenderNode = ({ render, iframeRef }) => {
  const { id } = useNode()
  const { actions, query, isActive } = useEditor((state) => ({
    isActive: !!state.nodes[id]?.events.selected,
  }))

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
    actions: { setProp },
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }))

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (isActive || isHover) {
      dom?.classList.add(componentSelected)
    } else {
      dom?.classList.remove(componentSelected)
    }
  }, [dom, isActive, isHover])

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom, right } = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0, right: 0 }
    return {
      top: top > 0 ? top : bottom,
      left,
      right,
      height: bottom - top,
    }
  }, [])

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef

    if (!currentDOM || !dom) return
    const { top, left } = getPos(dom)
    currentDOM.style.top = `${top}px`
    currentDOM.style.left = `${left}px`
  }, [dom, getPos])

  useEffect(() => {
    document.querySelector('#craftjs-renderer')?.addEventListener('scroll', scroll)

    return () => {
      document.querySelector('#craftjs-renderer')?.removeEventListener('scroll', scroll)
    }
  }, [scroll])

  const container = iframeRef.node.contentDocument?.body.querySelector('#page-container')

  return (
    <>
      {(isHover || isActive) && container && dom
        ? ReactDOM.createPortal(
            <div
              /*
              // @ts-ignore */
              ref={currentRef}
              className={cx(indicator, elP2, elFlex, elFlexAlignCenter)}
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <h2 className={cx(elFlex1, elMr4)}>{name}</h2>
              {moveable && (
                <>
                  <a
                    title="Increase block width"
                    className={cx(littleButton, elMr2, textWhite)}
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
                    className={cx(littleButton, elMr2, textWhite)}
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
                  className={cx(littleButton, elMr2, cursorMove)}
                  /*
                  // @ts-ignore */
                  ref={drag}
                >
                  <Move />
                </div>
              )}
              {id !== ROOT_NODE && (
                <a
                  className={cx(littleButton, elMr2, cursorPointer)}
                  onClick={() => {
                    actions.selectNode(parent)
                  }}
                >
                  <ArrowUp />
                </a>
              )}
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
            container,
          )
        : null}
      {render}
    </>
  )
}
