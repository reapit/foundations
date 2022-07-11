import { nodesArrToObj, nodesObjtoToArr } from '../node-helpers'

const emptyState = {
  ROOT: {
    type: { resolvedName: 'Container' },
    isCanvas: true,
    props: { width: 12, background: 'white', padding: 40 },
    displayName: 'Container',
    custom: { displayName: 'App' },
    // @ts-ignore until they update their types
    parent: null,
    hidden: false,
    nodes: ['tPwDk5SDAg'],
    linkedNodes: {},
  },
  tPwDk5SDAg: {
    type: { resolvedName: 'Text' },
    isCanvas: false,
    props: { fontSize: 12, width: 12, text: 'Type text here' },
    displayName: 'Text',
    custom: null,
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
}

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
      expect(nodesObjtoToArr(appId, pageId, emptyState as any)).toMatchSnapshot()
    })
  })
})
