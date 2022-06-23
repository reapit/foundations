import React from 'react'
import { useEditor, useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import * as EContainer from './ejectable/container'
import { MinusButton, PlusButton } from '../components'
import { styled } from '@linaria/react'

const Container = (props: ContainerProps) => {
  const {
    connectors: { connect, drag },
    id,
  } = useNode()
  const {
    query: { node },
  } = useEditor()
  const isRoot = node(id).isRoot()

  return <EContainer.Container {...props} ref={(ref) => ref && connect(drag(ref))} isRoot={isRoot} />
}

const defaultProps = {
  width: 12,
}

const ContainerSettingsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ContainerSettings = () => {
  const propKey = 'width'
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }))

  const sp = (value: any) => {
    setProp((props) => {
      props[propKey] = value
    })
  }

  const currentValue = parseInt(propValue, 10)

  return (
    <ContainerSettingsContainer>
      <ToolbarItem propKey={propKey} type={ToolbarItemType.Select} title="Grid">
        <option value={12}>12 Columns</option>
        <option value={11}>11 Columns</option>
        <option value={10}>10 Columns</option>
        <option value={9}>9 Columns</option>
        <option value={8}>8 Columns</option>
        <option value={7}>7 Columns</option>
        <option value={6}>6 Columns</option>
        <option value={5}>5 Columns</option>
        <option value={4}>4 Columns</option>
        <option value={3}>3 Columns</option>
        <option value={2}>2 Columns</option>
        <option value={1}>1 Columns</option>
      </ToolbarItem>
      <PlusButton
        onClick={() => {
          if (currentValue < 12) {
            sp(currentValue + 1)
          }
        }}
      />
      <MinusButton
        onClick={() => {
          if (currentValue > 1) {
            sp(currentValue - 1)
          }
        }}
      />
    </ContainerSettingsContainer>
  )
}

Container.craft = {
  props: defaultProps,
  displayName: 'Container',
  related: {
    toolbar: ContainerSettings,
  },
}
export type ContainerProps = EContainer.ContainerProps
export default Container
