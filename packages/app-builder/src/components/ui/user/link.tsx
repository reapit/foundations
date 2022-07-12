import { useEditor, useNode } from '@craftjs/core'
import React, { useEffect, useState } from 'react'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import Container from './container'
import { usePageId } from '@/components/hooks/use-page-id'
import { useAppPages } from '@/components/hooks/apps/use-app'
import { Link as ELink } from './ejectable/link'
import { styled } from '@linaria/react'
import ContentEditable from 'react-contenteditable'
import { elFlexAuto } from '@reapit/elements'

const defaultProps = {
  destination: '',
}

const Link = ({
  text,
  destination,
  ...props
}: {
  fontSize?: number
  width?: number
  text: string
  destination?: string
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }))
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
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
      className={elFlexAuto}
      ref={(ref) => ref && connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
      style={{
        fontSize,
        flex: `${width}`,
      }}
    >
      <ELink
        width={props.width || 12}
        destination={destination}
        ref={(ref) => ref && connect(drag(ref))}
        disabled={enabled}
      >
        <ContentEditable
          html={text}
          disabled={!editable}
          onChange={(e) => setProp((props) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')), 500)}
          tagName="p"
        />
      </ELink>
    </div>
  )
}

const DestinationPageContainer = styled.div`
  display: flex;
  align-items: center;
`

export const DestinationPage = ({
  propKey,
  title,
  createControl,
}: {
  propKey: string
  title: string
  createControl?: React.ReactNode
}) => {
  const { appId } = usePageId()
  const { pages } = useAppPages(appId)
  const propValue = useNode((node) => node.data.props[propKey])

  return (
    <DestinationPageContainer>
      {((propValue && createControl) || !createControl) && (
        <ToolbarItem type={ToolbarItemType.Select} propKey={propKey} title={title}>
          {pages?.map(({ id: value, name: label }) => (
            <option key={value} value={value}>
              {label || 'Home'}
            </option>
          ))}
          <option value="">Select a page</option>
        </ToolbarItem>
      )}
      {createControl}
    </DestinationPageContainer>
  )
}

export const LinkSettings = () => (
  <>
    <DestinationPage title="Link to" propKey="destination" />
  </>
)

Link.craft = {
  displayName: 'Link',
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: LinkSettings,
  },
}

export default Link
