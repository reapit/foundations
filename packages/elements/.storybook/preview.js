import '../src/styles/globals'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  options: {
    storySort: { method: 'alphabetical', order: ['Welcome', 'Introduction', 'Concepts', 'ChangeLog', '*'] },
  },
}
