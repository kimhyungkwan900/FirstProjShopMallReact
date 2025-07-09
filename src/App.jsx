import './App.css';
import { RouterProvider } from 'react-router-dom';
import  router  from './router/router';
import 'swiper/css';
import 'swiper/css/navigation';
import { UserContext } from './component/common/Context/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token || token === 'null' || token === 'undefined') {
      setUser(null);
      console.log("토큰 없음");
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log("받은 사용자 정보:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error('사용자 정보를 불러오지 못했습니다.', err);
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router}  />
    </UserContext.Provider>
)};

export default App;