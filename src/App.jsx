import './App.css';
import { RouterProvider } from 'react-router-dom';
import  router  from './router/router';
import 'swiper/css';
import 'swiper/css/navigation';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
