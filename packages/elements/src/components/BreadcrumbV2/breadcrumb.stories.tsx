import React from 'react'
import { storiesOf } from '@storybook/react'
import { Link, Router as BrowserRouter } from 'react-router-dom'
import { FaHome, FaHeart } from 'react-icons/fa'
import { createBrowserHistory } from 'history'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from './index'
import { Section } from '@/components/Layout'

export const history = createBrowserHistory()

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

storiesOf('Breadcrumb', module)
  .add('Basic Usage', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="#">Reapit</a>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent={true}>
          <a href="#">Component</a>
        </BreadcrumbItem>
      </Breadcrumb>
    </Section>
  ))
  .add('With An Icon', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
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
    </Section>
  ))
  .add('With Config Separator 1', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Breadcrumb separator=">">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Application Center</BreadcrumbItem>
        <BreadcrumbItem href="#">Application List</BreadcrumbItem>
        <BreadcrumbItem>An Application</BreadcrumbItem>
      </Breadcrumb>
    </Section>
  ))
  .add('With Config Separator 2', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Breadcrumb separator="">
        <BreadcrumbItem>Location</BreadcrumbItem>
        <BreadcrumbSeparator>:</BreadcrumbSeparator>
        <BreadcrumbItem href="#">Application Center</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem href="#">Application List</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>An Application</BreadcrumbItem>
      </Breadcrumb>
    </Section>
  ))
  .add('With routes custom renderer', () => {
    return (
      <BrowserRouter history={history}>
        <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
          <Breadcrumb itemRender={itemRender} routes={routes} />
        </Section>
      </BrowserRouter>
    )
  })
