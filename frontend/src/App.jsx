import React from 'react'
import { AppRouter } from './App.routes.jsx'
import { RouterProvider } from 'react-router'
import './app.css'


const App = () => {
  return (
     <RouterProvider router={AppRouter} />
  )
}

export default App