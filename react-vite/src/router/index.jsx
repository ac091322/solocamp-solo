import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import AlbumDetails from '../components/Album/AlbumDetails';
import Checkout from '../components/Checkout/Checkout';
import { albumLoader } from './album';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      }
    ],
  },
  {
    path: "/albums/:albumId",
    element: <AlbumDetails />,
    loader: albumLoader,
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>
  }
]);
