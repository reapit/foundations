import { Element, useEditor } from '@craftjs/core'
import React, { forwardRef, LegacyRef } from 'react'

import LinkSVG from '../icons/link'
import Text from './user/text'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { block, cursorMove, transition } from './styles'
import { elFlex, elFlexAlignStart, elFlexJustifyStart, elFlexRow, elFlexWrap, elM3, elW12 } from '@reapit/elements'
import Link from './user/link'
import { TextIcon } from '../icons/text'

export const Item = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  svg {
    width: 50px;
    height: 50px;
    fill: #23a4de;
  }
`

const ToolboxDiv = styled.div`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  background: #f8f8f8;
  padding: 14px;
  padding-top: 16px;
`

const ItemName = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #646464;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 68px;
  margin: 4.5px;
`

const CategoryTitle = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  padding-left: 4.5px;
  color: black;
`

export const ToolboxItem = forwardRef(
  (
    {
      name,
      children,
      onClick,
      className,
      style,
    }: {
      name: string
      children: React.ReactChild
      onClick?: React.MouseEventHandler<HTMLDivElement>
      className?: string
      style?: any
    },
    ref,
  ) => {
    return (
      <ItemContainer ref={ref as LegacyRef<HTMLDivElement>} onClick={onClick}>
        <Item style={style} className={cx(elM3, block, cursorMove, className)}>
          {children}
        </Item>
        <ItemName>{name}</ItemName>
      </ItemContainer>
    )
  },
)

export const Toolbox = ({ create }: { create: (ref: HTMLElement, ele: any) => void }) => {
  return (
    <ToolboxDiv>
      <CategoryTitle>Commonly used</CategoryTitle>
      <div className={cx(transition, elW12, elFlex, elFlexRow, elFlexWrap, elFlexAlignStart, elFlexJustifyStart)}>
        <ToolboxItem
          name="Text"
          ref={(ref: HTMLElement) => ref && create(ref, <Text fontSize={12} text="Type text in here" />)}
        >
          <TextIcon />
        </ToolboxItem>
        <ToolboxItem
          name="Link"
          ref={(ref: HTMLElement) =>
            ref && create(ref, <Element canvas is={Link} width={12} text="Type your link text in here" />)
          }
        >
          <Item>
            <LinkSVG />
          </Item>
        </ToolboxItem>
      </div>
    </ToolboxDiv>
  )
}

const ConnectedToolbox = () => {
  const {
    connectors: { create },
    actions: { selectNode },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <Toolbox
      create={(ref, ele) => {
        create(ref, ele, {
          onCreate: (nodeTree) => {
            selectNode(nodeTree.rootNodeId)
          },
        })
      }}
    />
  )
}

export default ConnectedToolbox
