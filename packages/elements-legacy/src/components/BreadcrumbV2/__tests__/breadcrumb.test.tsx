import React, { cloneElement } from 'react'
import { toArray, getBreadcrumbName, defaultItemRenderer, getPath, genForRoutes, Breadcrumb } from '../breadcrumb'
import { render } from '@testing-library/react'

describe('breadcrumb', () => {
  describe('toArray', () => {
    it('should run correctly', () => {
      const input = ['a', 'b', ['c', 'd', ['e']]]
      const output = ['a', 'b', 'c', 'd', 'e']
      const result = toArray(input)
      expect(result).toEqual(output)
      expect(true).toEqual(true)
    })
  })

  describe('cloneElement', () => {
    it('should run correctly', () => {
      const element = <div>Mock Element</div>
      const result = cloneElement(element, { separator: '/' })
      expect(result).toBeDefined()
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('getBreadcrumbName', () => {
    it('should run correctly', () => {
      const route = {
        path: 'index',
        breadcrumbName: 'home',
      }
      const result = getBreadcrumbName(route, {})
      expect(result).toEqual('home')
    })
  })

  describe('defaultItemRenderer', () => {
    it('should run correctly', () => {
      const input = {
        route: {
          path: 'index',
          breadcrumbName: 'home',
        },
        params: {},
        routes: [
          {
            path: 'index',
            breadcrumbName: 'home',
          },
          {
            path: 'first',
            breadcrumbName: 'first',
          },
          {
            path: 'second',
            breadcrumbName: 'second',
          },
        ],
        paths: ['index', 'first', 'second'],
      }
      const result = defaultItemRenderer(input.route, input.params, input.routes, input.paths)
      expect(result).toBeDefined()
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('getPath', () => {
    it('should run correctly', () => {
      const input = {
        path: '/test/:id',
        params: { id: 1 },
      }
      const result = getPath(input.path, input.params)
      expect(result).toEqual('test/1')
    })
  })

  describe('genForRoutes', () => {
    it('should run correctly', () => {
      const input = {
        path: '/test/:id',
        separator: '/',
        params: { id: 1 },
        routes: [
          {
            path: 'index',
            breadcrumbName: 'home',
          },
          {
            path: 'first',
            breadcrumbName: 'first',
          },
          {
            path: 'second',
            breadcrumbName: 'second',
          },
        ],
      }
      const result = genForRoutes(input)
      expect(result).toHaveLength(3)
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should run correctly', () => {
      const routes = [
        {
          path: 'index',
          breadcrumbName: 'home',
        },
        {
          path: 'first',
          breadcrumbName: 'first',
        },
        {
          path: 'second',
          breadcrumbName: 'second',
        },
      ]
      const itemRender = (route, params, routes, paths) => {
        const isLast = routes.indexOf(route) === routes.length - 1
        return isLast ? <span>{route.breadcrumbName}</span> : <a href={paths.join('/')}>{route.breadcrumbName}</a>
      }
      const input = {
        path: '/test/:id',
        separator: '/',
        params: { id: 1 },
        routes,
        itemRender,
      }
      const result = genForRoutes(input)
      expect(result).toHaveLength(3)
      const wrapper = render(<div>{result}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Breadcrumb', () => {
    it('should match snapshot', () => {
      const mockProps = {
        className: 'mockClassName',
        style: { font: '10rem' },
        routes: undefined,
        params: { id: 1 },
        separator: '/',
      }
      const wrapper = render(
        <Breadcrumb {...mockProps}>
          <div>mock Menu</div>
        </Breadcrumb>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const routes = [
        {
          path: 'index',
          breadcrumbName: 'home',
        },
        {
          path: 'first',
          breadcrumbName: 'first',
        },
        {
          path: 'second',
          breadcrumbName: 'second',
        },
      ]
      const itemRender = (route, params, routes, paths) => {
        const isLast = routes.indexOf(route) === routes.length - 1
        return isLast ? <span>{route.breadcrumbName}</span> : <a href={paths.join('/')}>{route.breadcrumbName}</a>
      }
      const mockProps = {
        className: 'mockClassName',
        style: { font: '10rem' },
        params: { id: 1 },
        separator: '/',
        routes,
        itemRender,
      }
      const wrapper = render(<Breadcrumb {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
