
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import AddBook from './Pages/AddBook.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path:'/add',
        element: <AddBook />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
