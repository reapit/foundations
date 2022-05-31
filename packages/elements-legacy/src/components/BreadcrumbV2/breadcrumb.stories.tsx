import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Link, Router as BrowserRouter } from 'react-router-dom'
import { FaHome, FaHeart } from 'react-icons/fa'
import { createBrowserHistory, History } from 'history'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from './index'
import { BreadcrumbProps } from './breadcrumb'

const history: History<any> = createBrowserHistory()

const routes = [
  {
    path: 'index',
    breadcrumbName: 'Home',
  },
  {
    path: 'first',
    breadcrumbName: 'First',
  },
  {
    path: 'second',
    breadcrumbName: 'Second',
  },
]
const itemRender = (route, params, routes, paths) => {
  const isLast = routes.indexOf(route) === routes.length - 1
  return isLast ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
}

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
}

export const BasicUsage: Story<BreadcrumbProps> = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <a href="#">Reapit</a>
    </BreadcrumbItem>
    <BreadcrumbItem isCurrent={true}>
      <a href="#">Component</a>
    </BreadcrumbItem>
  </Breadcrumb>
)

export const WithIcons: Story<BreadcrumbProps> = () => (
  <Breadcrumb>
    <BreadcrumbItem href="#">
      <span style={{ verticalAlign: '-0.15rem', marginRight: '0.5rem' }}>
        <FaHome />
      </span>
      <span>Home</span>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">
      <span style={{ verticalAlign: '-0.15rem', marginRight: '0.5rem' }}>
        <FaHeart />
      </span>
      <span>Application List</span>
    </BreadcrumbItem>
    <BreadcrumbItem>Application</BreadcrumbItem>
  </Breadcrumb>
)

export const WithConfigSeparator1: Story<BreadcrumbProps> = () => (
  <Breadcrumb separator=">">
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem href="#">Application Center</BreadcrumbItem>
    <BreadcrumbItem href="#">Application List</BreadcrumbItem>
    <BreadcrumbItem>An Application</BreadcrumbItem>
  </Breadcrumb>
)

export const WithConfigSeparator2: Story<BreadcrumbProps> = () => (
  <Breadcrumb separator="">
    <BreadcrumbItem>Location</BreadcrumbItem>
    <BreadcrumbSeparator>:</BreadcrumbSeparator>
    <BreadcrumbItem href="#">Application Center</BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem href="#">Application List</BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>An Application</BreadcrumbItem>
  </Breadcrumb>
)

export const WithRoutesCustomerRenderer: Story<BreadcrumbProps> = () => (
  <BrowserRouter history={history}>
    <Breadcrumb itemRender={itemRender} routes={routes} />
  </BrowserRouter>
)
