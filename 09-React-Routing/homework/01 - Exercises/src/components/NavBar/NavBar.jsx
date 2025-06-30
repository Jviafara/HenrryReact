import React from 'react'
import logoHenry from '../../assets/logo-henry.png'
import styleNav from './NavBar.module.css'
import { NavLink, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()
  const isActive = location.pathname
  return (
    <div className={styleNav.container}>
      <ul className={styleNav.menu}>
        <li>
          <NavLink to={'/'}>
            <img
              src={logoHenry}
              alt='logo-henry'
            />
          </NavLink>
        </li>
        <li>
          <h1>Central de Cruceros</h1>
        </li>
        <div className={styleNav.options}>
          <li>
            <NavLink
              className={
                isActive === '/shipping' ? styleNav.active : styleNav.disable
              }
              to='/shipping'
            >
              <span>Navieras</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/discounts'
              className={
                isActive === '/discounts' ? styleNav.active : styleNav.disable
              }
            >
              <span>Promociones</span>
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  )
}
