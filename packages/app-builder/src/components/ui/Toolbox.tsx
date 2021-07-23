import { Element, useEditor } from '@craftjs/core'
import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import SquareSvg from '../icons/square'
import TypeSvg from '../icons/type'

import Container from './user/Container'
import Text from './user/Text'
import { cx } from '@linaria/core'
import { bgWhite, block, cursorPointer, transition } from './styles'
import { elFlex, elFlex1, elFlexAlignCenter, elFlexColumn, elHFull, elM2, elPb2, elPt3, elW12 } from '@reapit/elements'

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
		cursor: move;
	`}
`

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => !props.enabled && 'width: 0;'}
  ${(props) => !props.enabled && 'opacity: 0;'}
`

const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <ToolboxDiv enabled={enabled} className={cx(transition, elW12, elHFull, elFlex, elFlexColumn, bgWhite)}>
      <div className={cx(elFlex, elFlex1, elFlexColumn, elFlexAlignCenter, elPt3)}>
        <div
          ref={(ref) =>
            ref &&
            create(ref, <Element canvas is={Container} background="white" padding={12} height="auto" width={12} />)
          }
        >
          <Item data-tip="Container" className={cx(elM2, elPb2, cursorPointer, block)} move>
            <SquareSvg />
          </Item>
        </div>
        <div ref={(ref) => ref && create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)}>
          <Item data-tip="Text" className={cx(elM2, elPb2, cursorPointer, block)} move>
            <TypeSvg />
          </Item>
        </div>
        <ReactTooltip place="bottom" />
      </div>
    </ToolboxDiv>
  )
}

export default Toolbox
