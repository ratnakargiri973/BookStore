
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import AddBook from './Pages/AddBook.jsx'
import Book from './Pages/Book.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import VerifyEmail from './Pages/VerifyEmail.jsx'
import AddBlog from './Pages/AddBlog.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path:'/add',
        element: <AddBook />
      },
      {
        path: '/book/:id',
        element: <Book />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />
      },
      {
        path: '/add-blog',
        element: <AddBlog />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
