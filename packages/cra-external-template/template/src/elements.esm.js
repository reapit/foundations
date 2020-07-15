import _slicedToArray from '@babel/runtime/helpers/slicedToArray'
import React__default, {
  memo,
  useState as useState$2,
  useEffect as useEffect$2,
  createElement,
  Fragment,
  createContext as createContext$1,
  useCallback,
  useContext,
  useMemo as useMemo$1,
  forwardRef,
  useRef,
  isValidElement as isValidElement$1,
  Children,
  cloneElement as cloneElement$1,
} from 'react'

var MenuComponent = function MenuComponent(_ref2) {
  // const ownMode = 'DESKTOP'
  // // if pass mode, take that value
  // // otherwise auto-detect
  // const mode = modeProp ?? ownMode
  var _React$useState = useState$2(1),
    _React$useState2 = _slicedToArray(_React$useState, 2)
  // console.log({ activeKey, setIsActive })

  return createElement('div', null, '1234') // const activeItemRef = React.createRef<HTMLAnchorElement & Link>()
  // React.useEffect(() => {
  //   setIsActive(activeItem || defaultActiveKey)
  // }, [activeItem])
  // // Auto scroll to the position of active item
  // React.useEffect(() => {
  //   const element = activeItemRef.current
  //   if (element) {
  //     element.scrollIntoView()
  //   }
  // }, [activeKey])
  // return (
  //   <nav className={`nav-bar ${mode === 'DESKTOP' ? 'is-desktop' : ''}`}>
  //     <ul>
  //       {menu.map((item: MenuItem) => {
  //         return item.disabled ? null : (
  //           <LinkItem activeItemRef={activeKey === item.key ? activeItemRef : undefined} key={item.key} item={item}>
  //             <li
  //               className={`nav-item ${activeKey === item.key ? 'is-active' : ''}`}
  //               onClick={() => item.type !== 'LOGO' && setIsActive(item.key)}
  //             >
  //               <div>{item.icon}</div>
  //               {item.title && <div className="nav-item-title">{item.title}</div>}
  //             </li>
  //           </LinkItem>
  //         )
  //       })}
  //     </ul>
  //   </nav>
  // )
}

var Menu = MenuComponent

export { Menu }
