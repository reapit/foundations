import { ComponentTypes } from '../../constants/component-types'

export const initializeSearchWidgetBlock = editor => {
  editor.BlockManager.add(ComponentTypes.SEARCH_WIDGET, {
    label: 'Search Widget',
    category: 'Reapit Web Components',
    attributes: { class: 'fa fa-search' },
    content: `
      <div data-gjs-type="SEARCH_WIDGET"></div>
    `,
    style: {
      display: 'flex',
    },
  })
}
