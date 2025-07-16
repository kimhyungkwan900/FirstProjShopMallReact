import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    let mounted = true;
    axios.get('/api/csrf-token')
      .then(res => {
        if (mounted) setCsrfToken(res.data.token);
      })
      .catch(err => {
        console.error('Failed to fetch CSRF token', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return csrfToken;
}
