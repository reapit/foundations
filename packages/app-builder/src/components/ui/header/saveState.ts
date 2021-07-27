import { EditorState } from '@craftjs/core'

type Page = {
  id: string
  name: string
  nodes: EditorState
}

const KEY = 'rpt_savestate'

export const getPages = (): Array<Page> => {
  const str = window.localStorage.getItem(KEY)
  if (!str) {
    return []
  }
  return JSON.parse(str) as Array<Page>
}

export const getPage = (id: string): Page => {
  const pages = getPages()
  const page = pages.find((p) => p.id === id)
  if (!page) {
    throw new Error('page not found')
  }
  return page
}

export const setPage = (id: string, page: Page) => {
  const pages = getPages()
  const index = pages.findIndex((p) => p.id === id)
  if (index === -1) {
    pages.push(page)
  } else {
    pages[index] = page
  }
  window.localStorage.setItem(KEY, JSON.stringify(pages))
}
