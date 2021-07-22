import { Element, useEditor } from '@craftjs/core'
import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import SquareSvg from '../icons/square'
import TypeSvg from '../icons/type'
// import ButtonSvg from '../icons/button'

import Container from './user/Container'
import Text from './user/Text'
// import Button from './user/Button'

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
    <ToolboxDiv enabled={enabled} className="toolbox transition w-12 h-full flex flex-col bg-white">
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            ref &&
            create(ref, <Element canvas is={Container} background="white" padding={12} height="auto" width={12} />)
          }
        >
          <Item data-tip="Container" className="m-2 pb-2 cursor-pointer block" move>
            <SquareSvg />
          </Item>
        </div>
        <div ref={(ref) => ref && create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)}>
          <Item data-tip="Text" className="m-2 pb-2 cursor-pointer block" move>
            <TypeSvg />
          </Item>
        </div>
        {/* <div ref={(ref) => ref && create(ref, <Button text="Click me!" />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <ButtonSvg />
            </Item>
          </Tooltip>
        </div> */}
        <ReactTooltip place="bottom" />
      </div>
    </ToolboxDiv>
  )
}

export default Toolbox
