export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(input, {
    ...init,
    credentials: 'include',
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.assign('/admin/login');
    }
    throw new Error('Unauthorized');
  }

  return response;
}
