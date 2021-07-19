import React, { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import { useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarSection, ToolbarItemType } from '../Toolbar'

const defaultProps = {
  fontSize: 12,
  width: 12,
}

const Text = ({ text, ...props }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }))
  const { fontSize, width } = {
    ...defaultProps,
    ...props,
  }
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
      style={{
        fontSize,
        flex: `${width}`,
      }}
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

const TextSettings = () => (
  <>
    <ToolbarSection
      title="Typography"
      props={['fontSize']}
      summary={({ fontSize }: any) => {
        return `${fontSize || ''}px`
      }}
    >
      <ToolbarItem propKey="fontSize" type={ToolbarItemType.Number} label="Font Size" />
    </ToolbarSection>
    <ToolbarSection
      title="Size"
      props={['width']}
      summary={({ width }: any) => {
        return `${width || ''} columns`
      }}
    >
      <ToolbarItem propKey="width" type={ToolbarItemType.Number} label="Columns" />
    </ToolbarSection>
  </>
)

Text.craft = {
  props: defaultProps,
  related: {
    toolbar: TextSettings,
  },
}

export default Text
