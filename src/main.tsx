import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router';
import routes from './routes.tsx';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const router = createHashRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
