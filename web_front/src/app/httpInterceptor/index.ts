import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterptor } from './http-interptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterptor, multi: true },
];
