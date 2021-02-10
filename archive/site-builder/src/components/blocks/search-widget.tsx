import React from 'react'
import { ComponentTypes } from '../../constants/component-types'

export const searchWidgetConfig = {
  label: 'Search Widget',
  category: 'Reapit Web Components',
  attributes: { class: 'fa fa-search' },
  content: <div id="reapit-search-widget" data-gjs-type="SEARCH_WIDGET"></div>,
}

export const initializeSearchWidgetBlock = editor => {
  editor.BlockManager.add(ComponentTypes.SEARCH_WIDGET, searchWidgetConfig)
}
