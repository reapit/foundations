import { Element, useEditor } from '@craftjs/core'
import React, { forwardRef, LegacyRef } from 'react'

import SquareSvg from '../icons/square'
import LinkSVG from '../icons/link'
import NavigationSvg from '../icons/navigation'

import Container from './user/container'
import Text from './user/text'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { block, cursorMove, transition } from './styles'
import { elFlex, elFlexAlignStart, elFlexJustifyStart, elFlexRow, elFlexWrap, elM3, elW12 } from '@reapit/elements'
import Link from './user/link'
import Table from './user/table'
import Form from './user/form'
import Info from './user/info'
import { ContainerIcon } from '../icons/container'
import { TextIcon } from '../icons/text'
import { TableIcon } from '../icons/table'
import { FormIcon } from '../icons/form'
import Navbar from './user/navbar'

const Item = styled.a`
  width: 64px;
  height: 64px;
  display: flex;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  background: #fff;
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

const ToolboxItem = forwardRef(({ name, children }: { name: string; children: React.ReactChild }, ref) => {
  return (
    <ItemContainer ref={ref as LegacyRef<HTMLDivElement>}>
      <Item className={cx(elM3, block, cursorMove)}>{children}</Item>
      <ItemName>{name}</ItemName>
    </ItemContainer>
  )
})

export const Toolbox = ({ create }: { create: (ref: HTMLElement, ele: any) => void }) => {
  return (
    <ToolboxDiv>
      <CategoryTitle>Commonly used</CategoryTitle>
      <div className={cx(transition, elW12, elFlex, elFlexRow, elFlexWrap, elFlexAlignStart, elFlexJustifyStart)}>
        <ToolboxItem
          name="Container"
          ref={(ref: HTMLElement) =>
            ref && create(ref, <Element canvas is={Container} background="white" padding={12} width={12} />)
          }
        >
          <ContainerIcon />
        </ToolboxItem>
        <ToolboxItem name="Text" ref={(ref: HTMLElement) => ref && create(ref, <Text fontSize={12} text="Hi there" />)}>
          <TextIcon />
        </ToolboxItem>
        <ToolboxItem
          name="Link"
          ref={(ref: HTMLElement) =>
            ref && create(ref, <Element canvas is={Link} background="white" padding={12} width={12} />)
          }
        >
          <Item>
            <LinkSVG />
          </Item>
        </ToolboxItem>
        <ToolboxItem
          name="Info"
          ref={(ref: HTMLElement) => ref && create(ref, <Element is={Info} padding={12} width={12} />)}
        >
          <Item>
            <SquareSvg />
          </Item>
        </ToolboxItem>
        <ToolboxItem
          name="Table"
          ref={(ref: HTMLElement) => ref && create(ref, <Element is={Table} padding={12} width={12} />)}
        >
          <Item>
            <TableIcon />
          </Item>
        </ToolboxItem>
        <ToolboxItem
          name="Form"
          ref={(ref: HTMLElement) => ref && create(ref, <Element canvas is={Form} padding={12} width={12} />)}
        >
          <Item>
            <FormIcon />
          </Item>
        </ToolboxItem>
        <ToolboxItem name="Navigation" ref={(ref: HTMLElement) => ref && create(ref, <Element canvas is={Navbar} />)}>
          <Item>
            <NavigationSvg />
          </Item>
        </ToolboxItem>
      </div>
    </ToolboxDiv>
  )
}

const ConnectedToolbox = () => {
  const {
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return <Toolbox create={create} />
}

export default ConnectedToolbox
