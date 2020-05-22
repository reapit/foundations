import React from 'react'
import { storiesOf } from '@storybook/react'
import { Link, Router as BrowserRouter } from 'react-router-dom'
import { FaHome, FaHeart } from 'react-icons/fa'
import { createBrowserHistory } from 'history'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from './index'

export const history = createBrowserHistory()

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
  return isLast ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
}

storiesOf('Breadcrumb', module)
  .add('Basic Usage', () => (
    <section className="section">
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="#">Reapit</a>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent={true}>
          <a href="#">Component</a>
        </BreadcrumbItem>
      </Breadcrumb>
    </section>
  ))
  .add('With An Icon', () => (
    <section className="section">
      <Breadcrumb>
        <BreadcrumbItem href="#">
          <FaHome />
          <span>Home</span>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">
          <FaHeart />
          <span>Application List</span>
        </BreadcrumbItem>
        <BreadcrumbItem>Application</BreadcrumbItem>
      </Breadcrumb>
    </section>
  ))
  .add('With Config Separator 1', () => (
    <section className="section">
      <Breadcrumb separator=">">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Application Center</BreadcrumbItem>
        <BreadcrumbItem href="#">Application List</BreadcrumbItem>
        <BreadcrumbItem>An Application</BreadcrumbItem>
      </Breadcrumb>
    </section>
  ))
  .add('With Config Separator 2', () => (
    <section className="section">
      <Breadcrumb separator="">
        <BreadcrumbItem>Location</BreadcrumbItem>
        <BreadcrumbSeparator>:</BreadcrumbSeparator>
        <BreadcrumbItem href="#">Application Center</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem href="#">Application List</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>An Application</BreadcrumbItem>
      </Breadcrumb>
    </section>
  ))
  .add('With routes custom renderer', () => {
    return (
      <BrowserRouter history={history}>
        <section className="section">
          <Breadcrumb itemRender={itemRender} routes={routes} />
        </section>
      </BrowserRouter>
    )
  })
