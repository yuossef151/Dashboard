import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { router } from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { GroupProvider } from './context/GroupContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GroupProvider>
      <RouterProvider router={router} />
    </GroupProvider>
  </StrictMode>,
)
