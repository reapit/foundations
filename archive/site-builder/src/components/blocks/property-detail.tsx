import React from 'react'
import { ComponentTypes } from '../../constants/component-types'

export const propertyDetailConfig = {
  label: 'Property Detail',
  category: 'Reapit Web Components',
  attributes: { class: 'fa fa-home' },
  content: <div id="reapit-property-detail" data-gjs-type="PROPERTY_DETAIL"></div>,
}

export const initializePropertyDetailBlock = editor => {
  editor.BlockManager.add(ComponentTypes.PROPERTY_DETAIL, propertyDetailConfig)
}
