import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createHashRouter, RouterProvider } from 'react-router';
import routes from './routes.tsx';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Navbar from './components/Navbar.tsx';

const basename = 'avalanche-vs-snowball-simulator/';

const router = createHashRouter(routes);

const navbarHeight = 'max(5vh,75px)';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Navbar navbarHeight={navbarHeight} />
    </BrowserRouter>
    <div style={{
      paddingTop: navbarHeight,
    }}>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
);
