import React from 'react'

export interface Element {
  type: string
  tagName?: string
  children?: Element[]
  attributes?: any
  content?: string
}

const sortContentType = (domItem: Element, index: number, diffing: boolean) => {
  // using DOMParse to parse HTML entities like &nbsp;
  return domItem.type === 'text'
    ? new DOMParser().parseFromString(domItem.content || '', 'text/html').documentElement.textContent || null
    : rendererModule.sortTags(domItem, index, diffing)
}

const getChildren = (domTag: Element, diffing: boolean) => {
  return domTag.children
    ? domTag.children.map((child: Element, index: number) => rendererModule.sortContentType(child, index, diffing))
    : null
}

const getAttributes = (domTag: Element, index: number) => {
  const attributes = domTag.attributes || []
  // convert to react-compatible props
  const reactPropsAttributes = Array.from(attributes as { [key: string]: any }[]).reduce(
    (acc, { key, value }) => ({
      ...acc,
      [key]: value,
    }),
    {},
  )
  return { ...reactPropsAttributes, key: index, style: {} }
}

const getAnchorAttrs = (attributes: { [key: string]: any }) => {
  const href = attributes['href']
  const dynamicHref = window['__REAPIT_MARKETPLACE_GLOBALS__'] ? `agencycloud://process/webpage?url=${href}` : href
  return {
    ...attributes,
    href: dynamicHref,
  }
}

const sortTags = (domTag: Element, index: number, diffing: boolean) => {
  const children = rendererModule.getChildren(domTag, diffing)
  const attributes = rendererModule.getAttributes(domTag, index)

  if (!children || !children.length) {
    return null
  }
  switch (domTag.tagName) {
    case 'p':
      return <p {...attributes}>{children}</p>
    case 'a':
      return window['__REAPIT_MARKETPLACE_GLOBALS__'] ? (
        <a {...getAnchorAttrs(attributes as { [key: string]: any })}>{children}</a>
      ) : (
        <a target="_blank" rel="noopener" {...getAnchorAttrs(attributes as { [key: string]: any })}>
          {children}
        </a>
      )
    case 'b':
      return <b {...attributes}>{children}</b>
    case 'u':
      return <u {...attributes}>{children}</u>
    case 'ul':
      return <ul {...attributes}>{children}</ul>
    case 'ol':
      return <ol {...attributes}>{children}</ol>
    case 'li':
      return <li {...attributes}>{children}</li>
    case 'h1':
      return <h1 {...attributes}>{children}</h1>
    case 'h2':
      return <h2 {...attributes}>{children}</h2>
    case 'h3':
      return <h3 {...attributes}>{children}</h3>
    case 'h4':
      return <h4 {...attributes}>{children}</h4>
    case 'h5':
      return <h5 {...attributes}>{children}</h5>
    case 'h6':
      return <h6 {...attributes}>{children}</h6>
    case 'i':
      return <i {...attributes}>{children}</i>
    case 'strike':
      return <del {...attributes}>{children}</del>
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'pre':
      return <pre {...attributes}>{children}</pre>
    case 'hr':
      return <hr {...attributes} />
    case 'ins':
      return diffing ? <ins {...attributes}>{children}</ins> : <div {...attributes}>{children}</div>
    case 'del':
      return diffing ? (
        <del className="del-diff" {...attributes}>
          {children}
        </del>
      ) : (
        <div {...attributes}>{children}</div>
      )
    default:
      return <div {...attributes}>{children}</div>
  }
}

const renderer = (domContent: Element[], diffing: boolean) =>
  domContent.map((domItem: Element, index: number) => rendererModule.sortContentType(domItem, index, diffing))

export const rendererModule = {
  sortContentType,
  getChildren,
  getAttributes,
  sortTags,
  renderer,
}
export default renderer
