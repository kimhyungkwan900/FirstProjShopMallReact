import './App.css'
import ReviewButton from './component/user/review/ReviewButton'
import { RouterProvider } from 'react-router-dom'
import ReviewRouter from './router/review/ReviewRouter'
function App() {

  return (
    <>
      <ReviewButton productId={1}/>
      <RouterProvider router = {ReviewRouter}/>
    </>
  )
}

export default App
