import React from 'react'
import { ComponentTypes } from '../../constants/component-types'

export const bookAValuationConfig = {
  label: 'Book a Valuation',
  category: 'Reapit Web Components',
  attributes: { class: 'fa fa-dollar' },
  content: <div id="reapit-book-a-valuation" data-gjs-type="BOOK_A_VALUATION"></div>,
}

export const initializeBookAValuationBlock = editor => {
  editor.BlockManager.add(ComponentTypes.BOOK_A_VALUATION, bookAValuationConfig)
}
