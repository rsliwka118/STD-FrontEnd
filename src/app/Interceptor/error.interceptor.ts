import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'
import { AlertsService } from 'src/app/Services/AlertsService/alerts.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor 
{
    constructor(private Alerts: AlertsService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => 
        {
            let id;
            if (error.error instanceof ErrorEvent) {
                // client-side error or network error
            } 
            else 
            {
                if (error.status === 401) 
                {
                    this.Alerts.showNotification('Błąd!', 'Nieprawidłowy login lub hasło.', 5000, 'danger')
                }

                if (error.status === 403) 
                {
                    this.Alerts.showNotification('Błąd!', 'Nie znaleziono użytkownika.', 5000, 'danger')
                }
                else if (error.status === 504) 
                {
                    switch (id) {
                        case 0: {
                            break
                        }
                        case 1: {
                            break
                        }
                        default: {
                            this.Alerts.showNotification('Błąd!', 'Brak połączenia z serwerem.', 5000, 'danger')
                            break
                        }
                    }
                }
            }
            return throwError(error);
        }));
    }
}
