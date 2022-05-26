import { emptyState } from '../emptyState'
import { nodesArrToObj, nodesObjtoToArr } from '../node-helpers'

describe('node-helpers', () => {
  describe('nodesArrToObj', () => {
    it('should match a snapshot', () => {
      expect(
        nodesArrToObj([
          {
            id: 'ROOT',
            nodeId: 'ROOT',
            displayName: 'div',
            hidden: false,
            isCanvas: false,
            nodes: [],
            linkedNodes: {},
            props: {},
            custom: {},
            parent: null,
            type: {
              resolvedName: 'div',
            },
          },
        ]),
      ).toMatchSnapshot()
    })
  })

  describe('nodesObjtoToArr', () => {
    const appId = 'app-id'
    const pageId = 'page-id'
    it('should match a snapshot', () => {
      expect(nodesObjtoToArr(appId, pageId, emptyState)).toMatchSnapshot()
    })
  })
})
