import { useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import { Button, ButtonGroup, elFlex, elFlex1, elMTAuto, elPr1, FlexContainer } from '@reapit/elements'
import React from 'react'
import ReactTooltip from 'react-tooltip'

import Checkmark from '../../icons/check'
import Customize from '../../icons/customize'
import RedoSvg from '../../icons/redo'
import UndoSvg from '../../icons/undo'
import { buttonIcon, disabled, header, item } from './styles'

import { PageSelector } from './PageSelector'
import { deletePage, setPageNodes } from './saveState'
import { useHistory, useParams } from 'react-router'

const usePageId = () => {
  const { pageId } = useParams<{ pageId?: string }>()
  const history = useHistory()
  const setPageId = (pageId) => history.push(`/${pageId}`)
  return { pageId, setPageId }
}

const Header = () => {
  const { pageId, setPageId } = usePageId()
  const { enabled, canUndo, canRedo, actions, query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  return (
    <FlexContainer className={header} isFlexJustifyCenter>
      <FlexContainer isFlexAlignCenter isFlexJustifyBetween className={cx(elFlex1, elMTAuto, elPr1)}>
        {enabled && (
          <div className={cx(elFlex, elFlex1)}>
            <a className={cx(item, !canUndo && disabled)} data-tip="Undo" onClick={() => actions.history.undo()}>
              <UndoSvg />
            </a>
            <a className={cx(item, !canRedo && disabled)} data-tip="Redo" onClick={() => actions.history.redo()}>
              <RedoSvg />
            </a>
          </div>
        )}
        {enabled && <PageSelector pageId={pageId} onChange={setPageId} />}
        <ButtonGroup>
          {enabled && (
            <>
              <Button
                size={2}
                style={{ zoom: 0.8 }}
                onClick={() => {
                  pageId && setPageNodes(pageId, query.serialize())
                }}
                intent="primary"
              >
                save page
              </Button>
              <Button
                size={2}
                style={{ zoom: 0.8 }}
                onClick={() => {
                  pageId && deletePage(pageId)
                }}
                intent="danger"
              >
                delete page
              </Button>
            </>
          )}
          <Button
            size={2}
            style={{ zoom: 0.8 }}
            intent="success"
            className={cx('transition cursor-pointer', enabled ? 'bg-green-400' : 'bg-primary')}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled))
            }}
          >
            <div className={buttonIcon}>{enabled ? <Checkmark /> : <Customize />}</div>
            {enabled ? 'Preview' : 'Edit'}
          </Button>
        </ButtonGroup>
      </FlexContainer>
      <ReactTooltip place="bottom" effect="solid" />
    </FlexContainer>
  )
}

export default Header
