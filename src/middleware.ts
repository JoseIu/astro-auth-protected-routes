import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const privateRoutes = ['/profile'];
const notAuthenticatedRoutes = ['/auth/login', '/auth/register'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, locals, redirect } = context;

  const session = await getSession(request);
  const isLoggedIn = !!session;
  const user = session?.user;

  locals.isLoggedIn = isLoggedIn;

  if (user) {
    // locals.user = {
    //   name: user.name!,
    //   email: user.email!
    // };
    locals.user = user as User;

    locals.isAdmin = user.role === 'ADMIN';
  }

  if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect('/auth/login');
  }

  if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
    return redirect('/');
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
