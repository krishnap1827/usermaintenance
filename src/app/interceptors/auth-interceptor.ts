import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('token');
  if (req.url.includes('/login')) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
