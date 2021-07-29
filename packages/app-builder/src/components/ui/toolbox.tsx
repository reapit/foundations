import { Element, useEditor } from '@craftjs/core'
import React from 'react'

import SquareSvg from '../icons/square'
import TypeSvg from '../icons/type'
import LinkSVG from '../icons/link'

import Container from './user/container'
import Text from './user/text'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { bgWhite, block, cursorMove, transition } from './styles'
import { elFlex, elFlex1, elFlexAlignCenter, elFlexColumn, elHFull, elM2, elPb2, elPt3, elW12 } from '@reapit/elements'
import { Link } from './user/link'

const Item = styled.a`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
`

const ToolboxDiv = styled.div`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
`

const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <ToolboxDiv
      style={{ width: enabled ? undefined : 0, opacity: enabled ? undefined : 0 }}
      className={cx(transition, elW12, elHFull, elFlex, elFlexColumn, bgWhite)}
    >
      <div className={cx(elFlex, elFlex1, elFlexColumn, elFlexAlignCenter, elPt3)}>
        <div
          ref={(ref) =>
            ref && create(ref, <Element canvas is={Container} background="white" padding={12} width={12} />)
          }
        >
          <Item data-tip="Container" className={cx(elM2, elPb2, block, cursorMove)}>
            <SquareSvg />
          </Item>
        </div>
        <div ref={(ref) => ref && create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)}>
          <Item data-tip="Text" className={cx(elM2, elPb2, cursorMove, block)}>
            <TypeSvg />
          </Item>
        </div>
        <div ref={(ref) => ref && create(ref, <Element canvas is={Link} background="white" padding={12} width={12} />)}>
          <Item data-tip="Link" className={cx(elM2, elPb2, cursorMove, block)}>
            <LinkSVG />
          </Item>
        </div>
      </div>
    </ToolboxDiv>
  )
}

export default Toolbox
