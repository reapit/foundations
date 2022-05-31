import * as React from 'react'
import { render } from '@testing-library/react'
import { HTMLRender } from '../'
import { htmlElements } from '../__stubs__/html'
import { Element, rendererModule } from '../utils'

const exampleHTML = `
        <div>
          <b>bold</b>
        </div>
        <div>
          <i>italic</i>
        </div>
        <div>
          <u>underline</u>
        </div>
        <h1>heading</h1>
        <div>
          <ul>
            <li>bullet points</li>
            <li>bullet points</li>
          </ul>
        </div>
`

describe('HTMLRender', () => {
  it('should render match to snapshot', () => {
    expect(render(<HTMLRender html={exampleHTML} />)).toMatchSnapshot()
  })
})

let numberIterations = 0

const itemIncrementor = (initialItem: Element[], spy: any) => {
  // I need to test recurrsively through a potentially very deeply nested DOM tree
  initialItem.forEach((item: Element, index: number) => {
    // Each time I call to sortContentType, I increase the calls
    numberIterations++
    // And check my iterable item was used as an arg to call sort
    expect(spy).toHaveBeenCalledWith(item, index, false)
    return item.children && itemIncrementor(item.children, spy)
  })
}

describe('renderer', () => {
  it('should call out to sortFunction for number of items in content array', () => {
    const sortContentSpy = jest.spyOn(rendererModule, 'sortContentType')
    const rendered = rendererModule.renderer(htmlElements, false)
    itemIncrementor(htmlElements, sortContentSpy)
    expect(rendered.length).toEqual(htmlElements.length)
    expect(sortContentSpy).toHaveBeenCalledTimes(numberIterations)
    expect(sortContentSpy).toHaveBeenCalled()
  })

  afterEach(() => {
    jest.restoreAllMocks()
    numberIterations = 0
  })
})

describe('sortContentType', () => {
  it('should call out to sortTags if an item, is of type tag', () => {
    jest.spyOn(rendererModule, 'getChildren').mockImplementation()
    const sortTagsSpy = jest.spyOn(rendererModule, 'sortTags')
    rendererModule.sortContentType(htmlElements[0], 0, false)
    expect(sortTagsSpy).toHaveBeenCalledTimes(1)
    expect(sortTagsSpy).toHaveBeenCalledWith(htmlElements[0], 0, false)
  })

  it('should not call out to sortTags if an item, is of type text and instead return the text', () => {
    jest.spyOn(rendererModule, 'getChildren').mockImplementation()
    const sortTagsSpy = jest.spyOn(rendererModule, 'sortTags')
    const textNode = htmlElements[0].children![1]
    const expectedText = rendererModule.sortContentType(textNode, 0, false)
    expect(sortTagsSpy).not.toHaveBeenCalled()
    expect(expectedText).toEqual(textNode.content)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    numberIterations = 0
  })
})

describe('getChildren', () => {
  it('should map children to sortContentType if there are any', () => {
    const sortContentTypeSpy = jest.spyOn(rendererModule, 'sortContentType')
    rendererModule.getChildren(htmlElements[0], false)
    itemIncrementor(htmlElements[0].children!, sortContentTypeSpy)
    expect(sortContentTypeSpy).toHaveBeenCalledTimes(numberIterations)
    expect(sortContentTypeSpy).toHaveBeenCalledWith(htmlElements[0].children![0], 0, false)
  })
  it('should not call out to sortContentType if no children and instead return null', () => {
    const sortContentTypeSpy = jest.spyOn(rendererModule, 'sortContentType')
    const children = rendererModule.getChildren(htmlElements[0].children![1], false)
    expect(sortContentTypeSpy).not.toHaveBeenCalled()
    expect(children).toBeNull()
  })
  afterEach(() => {
    jest.restoreAllMocks()
    numberIterations = 0
  })
})

describe('getAttributes', () => {
  it('should get the tag attributes if there are any, kill any styles add an index as key', () => {
    const attributes = [
      { key: 'id', value: 'my-id' },
      { key: 'src', value: 'some-src' },
      { key: 'style', value: 'width: "10px"' },
    ]
    const index = 0
    const expected = {
      id: 'my-id',
      src: 'some-src',
      key: index,
      style: {},
    }
    const result = rendererModule.getAttributes({ attributes } as Element, index)
    expect(result).toEqual(expected)
  })
  it('should just return an empty style tag and key if no attributes', () => {
    const index = 0
    const expected = {
      key: index,
      style: {},
    }
    const result = rendererModule.getAttributes({} as Element, index)
    expect(result).toEqual(expected)
  })
})

describe('sortTags', () => {
  const text = 'Test Text'
  const id = 'some-id'

  const coreProps = {
    type: 'element',
    attributes: {
      id,
    },
    children: [
      {
        type: 'text',
        content: text,
      },
    ],
  } as Partial<Element>
  const cases = [
    {
      tag: 'p',
    },
    {
      tag: 'a',
    },
    {
      tag: 'b',
    },
    {
      tag: 'u',
    },
    {
      tag: 'ul',
    },
    {
      tag: 'ol',
    },
    {
      tag: 'li',
    },
    {
      tag: 'h1',
      actualTag: 'h4',
    },
    {
      tag: 'h2',
      actualTag: 'h5',
    },
    {
      tag: 'i',
    },
    {
      tag: 'blockquote',
    },
    {
      tag: 'pre',
    },
    {
      tag: 'hr',
    },
  ]

  cases.forEach((node: any) => {
    it(`should match a snapshot and be of correct type for the returned component from domTag ${node.tag}`, () => {
      const element = { tagName: node.tag, ...coreProps } as Element
      const styledComponent = rendererModule.sortTags(element, 0, false) as React.ReactElement
      const wrappedComponent = render(styledComponent)

      expect(wrappedComponent).toMatchSnapshot()
    })
  })
})

describe('should not render empty tags', () => {
  it('empty children array', () => {
    const id = 'some-id'
    const coreProps = {
      tag: 'p',
      attributes: {
        id,
      },
      children: [],
    } as Partial<Element>
    const styledComponent = rendererModule.sortTags({ ...coreProps } as Element, 0, false)
    expect(styledComponent).toBe(null)
  })
  it('no children array', () => {
    const id = 'some-id'
    const coreProps = {
      tag: 'p',
      attributes: {
        id,
      },
    } as Partial<Element>
    const styledComponent = rendererModule.sortTags({ ...coreProps } as Element, 0, false)
    expect(styledComponent).toBe(null)
  })
})
