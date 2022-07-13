import React, { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import { useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import { elFlexAuto } from '@reapit/elements'
import { cx } from '@linaria/core'
import { ComponentWrapper, TypographyType, typographyTypeToClassName } from './ejectable'

const defaultProps = {
  fontSize: 12,
  width: 12,
  typographyType: '' as TypographyType,
}

const Text = ({
  text,
  ...props
}: {
  fontSize?: number
  width?: number
  text: string
  typographyType?: TypographyType
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }))
  const { width, typographyType } = {
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
    <ComponentWrapper
      width={width}
      className={cx(elFlexAuto, typographyTypeToClassName(typographyType))}
      ref={(ref) => ref && connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) => setProp((props) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')), 500)}
        tagName="p"
      />
    </ComponentWrapper>
  )
}

const TextSettings = () => (
  <>
    <ToolbarItem propKey="typographyType" type={ToolbarItemType.Select} title="Font Size">
      <option value="title">Title</option>
      <option value="subtitle">Subtitle</option>
      <option value="">Body Text</option>
      <option value="small">Small Text</option>
    </ToolbarItem>
  </>
)

Text.craft = {
  displayName: 'Text',
  props: defaultProps,
  related: {
    toolbar: TextSettings,
  },
}

export default Text
