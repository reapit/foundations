import { Element } from '../utils'

export const htmlElements: Element[] = [
  {
    type: 'element',
    tagName: 'div',
    attributes: [
      {
        key: 'class',
        value: 'post post-featured'
      }
    ],
    children: [
      {
        type: 'element',
        tagName: 'p',
        attributes: [],
        children: [
          {
            type: 'text',
            content: 'Himalaya parsed me'
          }
        ]
      },
      {
        type: 'text',
        content: ' ...and I liked it. '
      }
    ]
  }
]
