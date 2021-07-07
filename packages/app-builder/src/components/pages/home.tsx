// @ts-nocheck
import React, { FC, useState, useEffect } from 'react'
import { FlexContainer, Button, SecondaryNavContainer, SecondaryNavItem } from '@reapit/elements'
import { Editor, Frame, Element, useNode, useEditor } from '@craftjs/core'
import ContentEditable from 'react-contenteditable'

import {RenderNode} from '../ui/RenderNode'

export type AuthenticatedProps = {}

const Text = ({ text, ...props }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }))

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (selected) {
      return
    }

    setEditable(false)
  }, [selected])

  return (
    <div
      {...props}
      className="el-flex-auto"
      ref={(ref) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
            500
          )
        }
        tagName="p"
      />
    </div>
  )
}

const Sidebar = () => {
  const { connectors, query, actions } = useEditor()

  return (
    <SecondaryNavContainer>
      <SecondaryNavItem>
        <button ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}>Drag to add text</button>
      </SecondaryNavItem>
      <SecondaryNavItem>
          <Button onClick={() => {
            window.localStorage.saveState = query.serialize()
          }} intent="primary">save</Button>
      </SecondaryNavItem>
      <SecondaryNavItem>
          <Button onClick={() => {
            const state = window.localStorage.saveState
            if (!state) {
              return alert('nothing to load')
            }
            actions.deserialize(state)
          }} intent="secondary">load</Button>
      </SecondaryNavItem>
    </SecondaryNavContainer>
  )
}

const Container = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode()
  return (
    <div ref={(ref) => connect(drag(ref))}>{children}</div>
  )
}

export const Authenticated: FC<AuthenticatedProps> = () => {

  return (
    <FlexContainer className="page-container">
      <Editor resolver={{
        Text,
        Container,
      }} 
      onRender={RenderNode}
      >
        <Sidebar />
        <div style={{ minHeight: 800 }} className="craftjs-renderer">
          <Frame>
            <Element
              canvas
              is={Container}
            >
              <Text
                text="I'm here by default!"
              />
            </Element>
          </Frame>
        </div>
      </Editor>
    </FlexContainer>
  )
}

export default Authenticated
