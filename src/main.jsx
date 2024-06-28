import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VetRoute from '../routers/VetRoute.jsx'
import ClientRegister from '../components/ClientRegister.jsx'
import UpdateClient from '../components/UpdateClient.jsx'
import ClientList from '../components/ClientList.jsx'
import UserRegister from '../components/UserRegister.jsx'
import UsersList from '../components/UsersList.jsx'
import UpdateUsers from '../components/UpdateUsers.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

  },
  {
    path:"/vet",
    element: <VetRoute />,
    children:[
      {
        path: "client",
        children:[
          {
            path: "register",
            element: <ClientRegister/>
          },
          {
            path: "alterar",
            element: <UpdateClient />
          },
          {
            path:"consultar",
            element: <ClientList />
          }
        ]
        
      }, 
      {
        path: "users",
        children:[
          {
            path:"register",
            element: <UserRegister />
          },
          {
            path:"consultar",
            element: <UsersList />
          },
          {
            path:"alterar",
            element: <UpdateUsers />
          }
        ]
      }
      
    ]
    
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)