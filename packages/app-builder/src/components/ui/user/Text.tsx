import React, { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import { useNode } from '@craftjs/core'

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
      ref={(ref) => ref && connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) => setProp((props) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')), 500)}
        tagName="p"
      />
    </div>
  )
}

export default Text
