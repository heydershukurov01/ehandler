import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {Config} from './const/config';
import {EHandlerService} from './ehandler.service';

@Injectable()
export class EIntercepterService implements HttpInterceptor {
  constructor(@Inject('configurations') private config: Config, private eh: EHandlerService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const requestData = event.body;
          if (requestData) {
            if (requestData.exception && requestData.exception.code) {
              try {
                if (this.config && this.config.logoutCodes && this.config.logoutCodes.indexOf(requestData.exception.code) !== -1 ) {
                  this.eh.logout();
                } else {
                  const error = {
                    code: requestData.exception.code,
                    message: requestData.exception.message
                  }
                  this.eh.errorMSG(error.message, error.code);
                  this.eh.statusMessage(error);
                }
              } catch (e) {
                console.log('There was an error while trying to send message');
              }
            } else if (requestData.error && requestData.error.code) {
              try {
                if (this.config && this.config.logoutCodes && this.config.logoutCodes.indexOf(requestData.error.code) !== -1 ) {
                  this.eh.logout();
                } else {
                  const error = {
                    code: requestData.error.code,
                    message: requestData.error.message
                  }
                  this.eh.errorMSG(error.message, error.code);
                  this.eh.statusMessage(error);
                }
              } catch (e) {
                console.log('There was an error while trying to send message');
              }
            }
          }
        }
        return event;
      }),
      catchError(error => {
        this.eh.handleError(error);
        throw error;
      }),
      finalize(() => {})
    );
  }
}
