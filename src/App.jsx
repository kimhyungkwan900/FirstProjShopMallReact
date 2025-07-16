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
    // 1. CSRF 토큰을 초기 요청으로 쿠키에 주입
    const fetchCsrfToken = async () => {
      try {
        await axios.get('/api/csrf-token', {
          withCredentials: true,
        });
        console.log('[CSRF] 쿠키에 토큰 저장 완료');
      } catch (err) {
        console.error('[CSRF] 토큰 요청 실패', err);
      }
    };

    fetchCsrfToken();

    const userId = localStorage.getItem('userId');

    if (!userId || userId === 'null' || userId === 'undefined') {
      setUser(null);
      console.log('로그인 정보 없음');
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('/api/auth/me', {
          withCredentials: true,
        });

        const { id, role } = res.data;
        localStorage.setItem('userId', id);
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