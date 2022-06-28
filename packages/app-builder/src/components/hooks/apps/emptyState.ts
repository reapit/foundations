import { SerializedNode } from '@craftjs/core'

export const emptyState: Record<string, SerializedNode> = {
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
