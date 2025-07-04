import React from 'react'
/* eslint-disable */
import Home from './components/Home/Home.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import Shipping from './components/Shipping/Shipping.jsx'
import Discounts from './components/Discounts/Discounts.jsx'
import CardDetail from './components/CardDetail/CardDetail.jsx'
/* eslint-disable */
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        ></Route>
        <Route
          path='/shipping'
          element={<Shipping />}
        />
        <Route
          path='/discounts'
          element={<Discounts />}
        />
        <Route
          path='/cruiser/:id'
          element={<CardDetail />}
        />
      </Routes>
    </>
  )
}
