/* eslint-disable no-confusing-arrow */
// import { useNode } from '@craftjs/core'
import React, { useRef } from 'react'
import styled from 'styled-components'

export const IndicatorDiv = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 100%;
  display: block;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.25);
  z-index: 99999;
  border: 2px solid #36a9e0;
  cursor: ew-resize;
`

export const Indicator = ({ top, left }) => {
  const ref = useRef<HTMLElement>()
  return (
    <IndicatorDiv
      style={{
        top,
        left,
      }}
      ref={ref}
      onMouseDown={(e) => {
        document.body.classList.add('resizing')
        let start = 0
        let diff = 0
        if (e.pageX) {
          start = e.pageX
        } else if (e.clientX) {
          start = e.clientX
        }
        const onMouseMove = (e: MouseEvent) => {
          e.preventDefault()
          let end = 0
          if (e.pageX) {
            end = e.pageX
          } else if (e.clientX) {
            end = e.clientX
          }

          diff = end - start
          if (ref.current) {
            ref.current.style.left = left + diff + 'px'
          }
        }
        document.body.onmousemove = onMouseMove
        document.body.onmouseup = () => {
          if (ref.current) {
            ref.current.style.left = left + 'px'
          }
          document.body.onmousemove = null
          document.body.classList.remove('resizing')
        }
      }}
    />
  )
}

export const Indicators = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  ${Indicator} {
    &:nth-child(1) {
      left: -5px;
      top: 40%;
    }
    &:nth-child(2) {
      right: -5px;
      top: 40%;
      display: block;
    }
  }
`

// const Resizer = ({ children }: any) => {
//   const { active } = useNode((node) => ({
//     id: node.id,
//     parent: node.data.parent,
//     active: node.events.selected,
//     nodeWidth: node.data.props.width,
//   }))

//   return (
//     <span>
//       {children}
//       {active && (
//         <Indicators>
//           <Indicator></Indicator>
//           <Indicator></Indicator>
//         </Indicators>
//       )}
//     </span>
//   )
// }

// export default Resizer
