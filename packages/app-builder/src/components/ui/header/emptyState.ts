export const emptyState = {
  ROOT: {
    type: { resolvedName: 'Container' },
    isCanvas: true,
    props: { width: 12, background: 'white', padding: 40 },
    displayName: 'Container',
    custom: { displayName: 'App' },
    parent: null,
    hidden: false,
    nodes: ['tPwDk5SDAg'],
    linkedNodes: {},
  },
  tPwDk5SDAg: {
    type: { resolvedName: 'Text' },
    isCanvas: false,
    props: { fontSize: 12, width: 12, text: "I'm here by default!" },
    displayName: 'Text',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
}
