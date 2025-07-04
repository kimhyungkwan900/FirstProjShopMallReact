import './App.css'
import { RouterProvider } from 'react-router-dom';
import ProductRoutes from './router/user/product/ProductRoutes';
function App() {

  return (
    <RouterProvider router={ProductRoutes } />
  )
}

export default App;
