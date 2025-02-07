import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/profile'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;

  const authHeaders = request.headers.get('authorization') ?? '';

  if (privateRoutes.includes(url.pathname)) {
    return checkLoaclAuth(authHeaders, next);
  }

  return next();
});

const checkLoaclAuth = (authHeaders: string, next: MiddlewareNext) => {
  if (authHeaders) {
    const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass';
    const decodedValue = atob(authValue).split(':');
    const [username, password] = decodedValue;

    if (username === 'admin' && password === 'admin') {
      return next();
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
};
