import React from 'react'
import { isFragment } from 'react-is'
import BreadcrumbItem from './breadcrumb-item'
import { breadcrumbItem } from './__styles__/styles'

export const toArray = (children: React.ReactNode): React.ReactElement[] => {
  let result: React.ReactElement[] = []
  React.Children.forEach(children, (child: any) => {
    if (child === undefined || child === null) {
      return
    }
    if (Array.isArray(child)) {
      result = result.concat(toArray(child))
    } else if (isFragment(child) && child.props) {
      result = result.concat(toArray(child.props.children))
    } else {
      result.push(child)
    }
  })

  return result
}

export const isValidElement = React.isValidElement

export const cloneElement = (element: React.ReactNode, props?: any): React.ReactNode => {
  if (!isValidElement(element)) return element
  return React.cloneElement(element, typeof props === 'function' ? props() : props)
}

export const getBreadcrumbName = (route: Route, params: any) => {
  if (!route.breadcrumbName) {
    return null
  }
  const paramsKeys = Object.keys(params).join('|')
  const paramsRegex = new RegExp(`:(${paramsKeys})`, 'g')
  const name = route.breadcrumbName.replace(paramsRegex, (replacement, key) => params[key] || replacement)
  return name
}

export interface Route {
  path: string
  breadcrumbName: string
}

export interface BreadcrumbProps {
  routes?: Route[]
  params?: any
  separator?: React.ReactNode
  itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

export const defaultItemRenderer = (
  route: Route,
  params: any,
  routes: Array<Route>,
  paths: Array<string>,
): React.ReactNode => {
  const isLastItem = routes.indexOf(route) === routes.length - 1
  const name = getBreadcrumbName(route, params)
  return isLastItem ? <span className={breadcrumbItem}>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>
}

export const getPath = (path: string, params: any) => {
  path = (path || '').replace(/^\//, '')
  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key])
  })
  return path
}

export type GenForRoutesParams = {
  routes?: Route[]
  params?: any
  separator?: React.ReactNode
  itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode
}

export const genForRoutes = ({
  routes = [],
  params = {},
  separator,
  itemRender = defaultItemRenderer,
}: GenForRoutesParams) => {
  const paths: string[] = []
  return routes.map((route) => {
    const isLast = routes.indexOf(route) === routes.length - 1
    const path = getPath(route.path, params)
    if (path) {
      paths.push(path)
    }
    return (
      <BreadcrumbItem isLast={isLast} separator={separator} key={path || route.breadcrumbName}>
        {itemRender(route, params, routes, paths)}
      </BreadcrumbItem>
    )
  })
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  style,
  routes,
  params,
  separator,
  itemRender,
  children,
}: BreadcrumbProps) => {
  let crumbs
  if (routes && routes.length > 0) {
    crumbs = genForRoutes({ routes, params, separator, itemRender })
  } else {
    const childrenArr = toArray(children)
    crumbs = childrenArr.map((element: any, index) => {
      const isLastElement = childrenArr.length - 1 === index
      return cloneElement(element, {
        separator,
        key: index,
        isLast: isLastElement,
      })
    })
  }
  return (
    <div className={className} style={style}>
      {crumbs}
    </div>
  )
}

export default Breadcrumb
