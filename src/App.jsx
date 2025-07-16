import './App.css';
import { RouterProvider } from 'react-router-dom';
import  router  from './router/router';
import 'swiper/css';
import 'swiper/css/navigation';
import { UserContext } from './component/common/Context/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId || userId === 'null' || userId === 'undefined') {
      setUser(null);
      console.log("로그인 정보 없음");
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('/api/auth/me', {
          withCredentials: true,
        });

        const { userId, role } = res.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        setUser(res.data);
      } catch (err) {
        console.error('사용자 정보를 불러오지 못했습니다.', err);
        setUser(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
      }
    };
    fetchCurrentUser();
  }, []);
  
  Modal.setAppElement('#root');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router}  />
    </UserContext.Provider>
)};

export default App;