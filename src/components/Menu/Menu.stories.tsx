import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Menu } from '.'
import { MemoryRouter } from 'react-router'
import { MenuConfig } from './Menu'

const logo = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 269.72 119.06" width="150px" height="65px">
    <title>Reapit_House_RGB</title>
    <g id="House">
      <path
        style={{ fill: '#1d1d1b' }}
        d="M229.49,68.32V55.5h5.93c.56,0,.84-.27.84-.79V50.62q0-.78-.84-.78h-6l-.36-6.72a.76.76,0,0,0-.84-.73h-4.4c-.56,0-.84.26-.84.79V68.77a12.5,12.5,0,0,0,.81,4.76,8.32,8.32,0,0,0,5.46,5,13.9,13.9,0,0,0,4.09.59l1.43,0,1.54-.08a.84.84,0,0,0,.62-.31,1.07,1.07,0,0,0,.16-.59V73.86c0-.52-.3-.78-.89-.78s-.88.07-1.29.08l-1,0a4.18,4.18,0,0,1-3.27-1.26,5.15,5.15,0,0,1-1.15-3.61M215.34,39.2a3.57,3.57,0,0,0-2.63-1,3.68,3.68,0,0,0-2.63,1A3.46,3.46,0,0,0,209,41.83a3.65,3.65,0,0,0,3.7,3.7,3.46,3.46,0,0,0,2.63-1.07,3.68,3.68,0,0,0,1-2.63,3.57,3.57,0,0,0-1-2.63m-.22,39.26q.78,0,.78-.84V50.23a.69.69,0,0,0-.78-.78h-4.87q-.84,0-.84.78V77.62a.74.74,0,0,0,.84.84ZM187,73a9.1,9.1,0,0,1-2.41-1.15V55.27a8.24,8.24,0,0,1,2.41-.61,22.26,22.26,0,0,1,2.85-.17,7.11,7.11,0,0,1,4.73,1.43q1.71,1.42,1.71,5.06v6.28a6,6,0,0,1-1.65,4.67,6.76,6.76,0,0,1-4.68,1.49,9.85,9.85,0,0,1-3-.42m-8.91-21.31V88.26a.74.74,0,0,0,.84.84h4.82a.74.74,0,0,0,.84-.84V77.9a15.48,15.48,0,0,0,2.77.89,13.92,13.92,0,0,0,3.16.34,14.15,14.15,0,0,0,5-.84,11.68,11.68,0,0,0,3.92-2.38A10.83,10.83,0,0,0,202,72.16a12.89,12.89,0,0,0,.92-5V61a14,14,0,0,0-1-5.49,10.48,10.48,0,0,0-2.69-3.81,11,11,0,0,0-4.09-2.24,17.55,17.55,0,0,0-5.12-.72,32.85,32.85,0,0,0-5.77.53,30.85,30.85,0,0,0-5.54,1.48.88.88,0,0,0-.62.9M155.29,67a7.94,7.94,0,0,1,4.53-1c.86,0,1.8,0,2.8.14s1.89.2,2.64.31V72.8a20.31,20.31,0,0,1-2.52.48,21.68,21.68,0,0,1-2.86.19,9.09,9.09,0,0,1-4.26-.89,3,3,0,0,1-1.68-2.86A3.18,3.18,0,0,1,155.29,67m-6.16-14.3,2.24,3.41a.68.68,0,0,0,1.12.23,12.64,12.64,0,0,1,3.19-1.29,14.91,14.91,0,0,1,4-.51c2.09,0,3.54.44,4.36,1.32a6.25,6.25,0,0,1,1.24,4.34v1.06c-.86-.11-1.78-.21-2.75-.3a27.73,27.73,0,0,0-2.85-.14,21,21,0,0,0-4.93.53A11.43,11.43,0,0,0,150.84,63a7.66,7.66,0,0,0-2.55,2.8,8.32,8.32,0,0,0-.9,4,8.71,8.71,0,0,0,1,4.42,8.13,8.13,0,0,0,2.77,2.88,12.14,12.14,0,0,0,4,1.57,22.36,22.36,0,0,0,4.7.48,36,36,0,0,0,6.1-.51,40.08,40.08,0,0,0,5.16-1.17,1,1,0,0,0,.61-1V60.14a14.12,14.12,0,0,0-.84-5.12,9,9,0,0,0-2.38-3.53,10,10,0,0,0-3.69-2,15.83,15.83,0,0,0-4.74-.67,22.76,22.76,0,0,0-6.18.78,15.88,15.88,0,0,0-4.79,2.18q-.39.34,0,1m-13,9H124.54V60.2c0-2.05.56-3.52,1.66-4.4a6.42,6.42,0,0,1,4.11-1.31,6.5,6.5,0,0,1,4.06,1.31q1.71,1.32,1.71,4.4Zm6.33-1.4a12.23,12.23,0,0,0-1-5.27,10,10,0,0,0-2.71-3.55,10.84,10.84,0,0,0-3.87-2,15.7,15.7,0,0,0-4.48-.64,16.06,16.06,0,0,0-4.51.64,11.34,11.34,0,0,0-3.94,2,10,10,0,0,0-2.8,3.55A11.93,11.93,0,0,0,118,60.26v7.95a10.6,10.6,0,0,0,1,4.84,10,10,0,0,0,2.74,3.39,11.86,11.86,0,0,0,3.92,2,15.94,15.94,0,0,0,4.57.67,18.07,18.07,0,0,0,6.35-1,17.88,17.88,0,0,0,5-2.83c.49-.37.55-.76.17-1.17L139.5,71a.73.73,0,0,0-1.12-.17A18.58,18.58,0,0,1,135,72.66a11.88,11.88,0,0,1-4.48.76,6.73,6.73,0,0,1-4.31-1.29,4.65,4.65,0,0,1-1.63-3.87V66.7h17c.56,0,.84-.27.84-.79ZM98.35,44.63c2.61,0,4.55.53,5.8,1.6S106,49,106,51.24a6.17,6.17,0,0,1-1.87,5c-1.25,1.06-3.19,1.59-5.8,1.59h-7V44.63Zm15,33.83a.69.69,0,0,0,.62-.28c.11-.19.07-.43-.12-.73L103.62,63.11a12.61,12.61,0,0,0,6.86-4.23,12,12,0,0,0,2.43-7.7q0-6-3.81-9.4T98.35,38.42h-13q-.78,0-.78.84V77.62q0,.84.78.84h5.15c.52,0,.79-.28.79-.84V63.84h5l9.8,14.06a1.05,1.05,0,0,0,1,.56Z"
      />
      <polygon style={{ fill: '#262f69' }} points="57.03 78.42 48.72 58.21 28.54 49.81 28.54 78.42 57.03 78.42" />
      <polygon
        style={{ fill: '#0061a8' }}
        points="68.93 78.42 68.93 67.29 68.93 66.57 48.7 58.22 57.03 78.42 68.93 78.42"
      />
      <polygon style={{ fill: '#7bc9eb' }} points="28.54 49.81 48.7 58.22 40.38 38.05 28.54 49.81" />
      <polygon
        style={{ fill: '#23a4de' }}
        points="68.93 49.81 48.76 29.66 45.63 32.78 40.37 38.06 48.7 58.22 68.93 66.57 68.93 49.81"
      />
    </g>
  </svg>
)

storiesOf('Menu', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('has defaultActiveKey', () => {
    const propsMenu = {
      title: 'Foundations',
      logo: logo,
      homeUrl: '/home',
      defaultActiveKey: 'Apps',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Approvals',
              key: '/admin/approvals',
              toUrl: '/admin/approvals'
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: action('logoutCallback')
            }
          ]
        }
      ],
      location: {
        pathname: '/admin/approvals'
      }
    } as MenuConfig
    return (
      <section className="section">
        <div className="column is-desktop">
          <Menu {...propsMenu} />
        </div>
      </section>
    )
  })
  .add('doesnt have defaultActiveKey', () => {
    const propsMenu = {
      title: 'Foundations',
      logo: logo,
      homeUrl: '/home',
      defaultActiveKey: 'NONE',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Approvals',
              key: '/admin/approvals',
              toUrl: '/admin/approvals'
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: action('logoutCallback')
            }
          ]
        }
      ],
      location: {
        pathname: ''
      }
    } as MenuConfig
    return (
      <section className="section">
        <div className="column is-desktop">
          <Menu {...propsMenu} />
        </div>
      </section>
    )
  })
  .add('Responsive behaviour disabled', () => {
    const propsMenu = {
      title: 'Foundations',
      logo: logo,
      homeUrl: '/home',
      defaultActiveKey: 'NONE',
      isResponsive: false,
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Approvals',
              key: '/admin/approvals',
              toUrl: '/admin/approvals'
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: action('logoutCallback')
            }
          ]
        }
      ],
      location: {
        pathname: ''
      }
    } as MenuConfig
    return (
      <section className="section">
        <div className="column is-desktop">
          <Menu {...propsMenu} />
        </div>
      </section>
    )
  })
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('shows when mobile', () => {
    const propsMenu = {
      title: 'Foundations',
      logo: logo,
      homeUrl: '/home',
      defaultActiveKey: 'NONE',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Approvals',
              key: '/admin/approvals',
              toUrl: '/admin/approvals'
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: action('logoutCallback')
            }
          ]
        }
      ],
      location: {
        pathname: ''
      }
    } as MenuConfig
    return (
      <section className="section">
        <div className="column is-half-desktop">
          <Menu {...propsMenu} />
        </div>
      </section>
    )
  })
