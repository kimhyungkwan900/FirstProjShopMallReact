export function withCsrf(config = {}, csrfToken) {
  return {
    ...config,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers || {}),
      'X-CSRF-TOKEN': csrfToken,
    },
  };
}

export function withCsrfEmpty(csrfToken) {
  return withCsrf({}, csrfToken);
}

export function withCsrfForm(csrfToken) {
  return {
    withCredentials: true,
    headers: {
      'X-CSRF-TOKEN': csrfToken,
    },
  };
}