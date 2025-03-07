import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/ui/auth/Signup'
import Login from './components/ui/auth/Login'
import Home from './components/Home'

function App() {

  const appRouter = createBrowserRouter([
    {
      path:'/',
      element: <Home/>
    },{
      path:'/login',
      element: <Login/>
    },{
      path:'/signup',
      element: <Signup/>
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
