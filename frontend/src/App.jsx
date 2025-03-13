import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import ReferralPosts from './components/ReferralPosts'
import Browse from './components/Browse'
import { Profile } from './components/Profile'
import PostDetails from './components/PostDetails'

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
    },{
      path:'/referralposts',
      element: <ReferralPosts/>
    },{
      path:'/postdetails/12345',
      element: <PostDetails/>
    },{
      path:'/browse',
      element: <Browse/>
    },{
      path:'/profile',
      element: <Profile/>
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
