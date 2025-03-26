import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import ReferralPosts from './components/ReferralPosts'
import { Profile } from './components/Profile'
import PostDetails from './components/PostDetails'
import CompanyPage from './components/CompanyPage'
import Companies from './components/Companies'
import CreateReferralPost from './components/CreateReferralPost'

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
      path:`/postdetails/:id`,
      element: <PostDetails/>
    },{
      path:'/profile',
      element: <Profile/>
    },{
      path:'/company/:id',
      element: <CompanyPage/>
    },{
      path:'/companies',
      element: <Companies />
    },{
      path:'/referralposts/createpost',
      element:<CreateReferralPost/>
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
