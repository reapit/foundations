import { useNode, useEditor } from '@craftjs/core'
import { ROOT_NODE } from '@craftjs/utils'
import React, { useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { intentPrimary } from '@reapit/elements'

import ArrowUp from '../icons/arrow-up'
import Delete from '../icons/delete'
import Move from '../icons/move'

const IndicatorDiv = styled.div`
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;
  background: ${intentPrimary}; /* couldn't get the CSS vars into the iframe on first try :( */

  svg {
    fill: #fff;
    width: 15px;
    height: 15px;
  }
`

const Globals = createGlobalStyle`
  .component-selected {
    position: relative;
  }
  .component-selected:after {
    content: " ";
    border: 1px dashed #2680eb;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    display: block;
  }
`

const Btn = styled.a`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  :hover {
    color: white;
  }
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`

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
      dom?.classList.add('component-selected')
    } else {
      dom?.classList.remove('component-selected')
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
    document.querySelector('.craftjs-renderer')?.addEventListener('scroll', scroll)

    return () => {
      document.querySelector('.craftjs-renderer')?.removeEventListener('scroll', scroll)
    }
  }, [scroll])

  const container = iframeRef.node.contentDocument?.body.querySelector('#page-container')

  return (
    <>
      {(isHover || isActive) && container && dom
        ? ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              className="px-2 py-2 text-white bg-primary fixed flex items-center"
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <Globals />
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable && (
                <>
                  <Btn
                    title="Increase block width"
                    className="mr-2 text-white"
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
                  </Btn>
                  <Btn
                    title="Decrease block width"
                    className="mr-2 text-white"
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
                  </Btn>
                </>
              )}
              {moveable ? (
                <Btn className="mr-2 cursor-move" ref={drag}>
                  <Move />
                </Btn>
              ) : null}
              {id !== ROOT_NODE && (
                <Btn
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent)
                  }}
                >
                  <ArrowUp />
                </Btn>
              )}
              {deletable ? (
                <Btn
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    actions.delete(id)
                  }}
                >
                  <Delete />
                </Btn>
              ) : null}
            </IndicatorDiv>,
            container,
          )
        : null}
      {render}
    </>
  )
}
