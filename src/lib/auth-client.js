import { jwtClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000'),
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const apiFetch = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${SERVER_URL}${endpoint}`;
  const headers = { ...options.headers };

  try {
    const sessionRes = await getSession();
    if (sessionRes?.data?.session?.token) {
      headers['Authorization'] = `Bearer ${sessionRes.data.session.token}`;
    }
    if (sessionRes?.data?.user?.email) {
      headers['x-user-email'] = sessionRes.data.user.email;
      headers['x-user-name'] = sessionRes.data.user.name || '';
    }
  } catch {}

  const res = await authClient.$fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (res?.error) {
    const err = new Error(res.error.message || 'Request failed');
    err.status = res.error.status;
    err.response = { data: res.error, status: res.error.status };
    throw err;
  }

  return {
    data: res?.data !== undefined ? res.data : res,
    status: 200,
  };
};

export const api = {
  get: (endpoint, options) => apiFetch(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    apiFetch(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) =>
    apiFetch(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options) =>
    apiFetch(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
