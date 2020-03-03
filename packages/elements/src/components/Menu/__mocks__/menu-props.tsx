import React from 'react'
import { Location } from 'history'
import { FaCloudDownloadAlt, FaCloud, FaCloudUploadAlt, FaSignOutAlt, FaCog, FaReadme } from 'react-icons/fa'
import { ReapitLogo } from '../Logo'
import { MenuConfig } from '../Menu'

export const mockMenuProps: MenuConfig = {
  defaultActiveKey: 'APPS',
  mode: 'WEB',
  location: {
    pathname: '/',
  } as Location<any>,
  menu: [
    {
      key: 'LOGO',
      icon: <ReapitLogo className="nav-item-icon" />,
      type: 'LOGO',
    },
    {
      title: 'Apps',
      key: 'APPS',
      url: '/apps',
      icon: <FaCloud className="nav-item-icon" />,
      type: 'PRIMARY',
    },
    {
      title: 'Installed',
      key: 'INSTALLED',
      url: '/installed',
      icon: <FaCloudDownloadAlt className="nav-item-icon" />,
      type: 'PRIMARY',
    },
    {
      title: 'Submit',
      key: 'SUBMIT',
      url: '/submit',
      icon: <FaCloudUploadAlt className="nav-item-icon" />,
      type: 'PRIMARY',
    },
    {
      title: 'Docs',
      key: 'DOCS',
      url: '/docs',
      icon: <FaReadme className="nav-item-icon" />,
      type: 'PRIMARY',
    },
    {
      title: 'Settings',
      key: 'SETTINGS',
      url: '/settings',
      icon: <FaCog className="nav-item-icon" />,
      type: 'PRIMARY',
    },
    {
      title: 'Logout',
      key: 'LOGOUT',
      callback: () => console.log('logging out'),
      icon: <FaSignOutAlt className="nav-item-icon" />,
      type: 'SECONDARY',
    },
  ],
}
