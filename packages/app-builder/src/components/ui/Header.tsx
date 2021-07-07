import { useEditor } from '@craftjs/core'
import { Tooltip } from '@material-ui/core'
import { Button, ButtonGroup } from '@reapit/elements'
import cx from 'classnames'
import React from 'react'
import styled from 'styled-components'

import Checkmark from '../icons/check'
import Customize from '../icons/customize'
import RedoSvg from '../icons/redo'
import UndoSvg from '../icons/undo'

const HeaderDiv = styled.div`
  width: 100%;
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0px 10px;
  background: var(--nav-menu-background-dark);
  display: flex;
`

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`

const ButtonIcon = styled.div`
  display: inline;
  svg {
    fill: white;
    width: 18px;
    height: 18px;
    display: inline;
    margin-right: 9px;
  }
`

const Header = () => {
  const { enabled, canUndo, canRedo, actions, query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  return (
    <HeaderDiv className="header text-white transition w-full">
      <div className="items-center flex w-full px-4 justify-end">
        {enabled && (
          <div className="flex-1 flex">
            <Tooltip title="Undo" placement="bottom">
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                <UndoSvg />
              </Item>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                <RedoSvg />
              </Item>
            </Tooltip>
          </div>
        )}
        <ButtonGroup>
          {enabled && (
            <>
              <Button
                size={2}
                style={{ zoom: 0.8 }}
                onClick={() => {
                  window.localStorage.saveState = query.serialize()
                }}
                intent="primary"
              >
                save
              </Button>
              <Button
                size={2}
                style={{ zoom: 0.8 }}
                onClick={() => {
                  const state = window.localStorage.saveState
                  if (!state) {
                    return alert('nothing to load')
                  }
                  actions.deserialize(state)
                }}
                intent="secondary"
              >
                load
              </Button>
            </>
          )}
          <Button
            size={2}
            style={{ zoom: 0.8 }}
            intent="success"
            className={cx([
              'transition cursor-pointer',
              {
                'bg-green-400': enabled,
                'bg-primary': !enabled,
              },
            ])}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled))
            }}
          >
            <ButtonIcon>{enabled ? <Checkmark /> : <Customize />}</ButtonIcon>
            {enabled ? 'Finish Editing' : 'Edit'}
          </Button>
        </ButtonGroup>
      </div>
    </HeaderDiv>
  )
}

export default Header
