import {ErrorHandler, Inject, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Config} from './const/config';
import {HookService} from './hook.service';
import * as toastr from 'toastr';
@Injectable({
  providedIn: 'root'
})
export class EHandlerService implements ErrorHandler {
  constructor(
    private injector: Injector,
    @Inject('configurations') private config: Config,
    private hook: HookService,
  ) {
  }
  /**
   * Global Error Handler
   */
  handleError(error: any) {
    /**
     * Error Message for view
     */
    let message: string;
    /**
     * Error TimeStamp
     */
    const date: Date = new Date();
    /**
     * Handle errors occured while making server call
     */
    if (error instanceof HttpErrorResponse) {
      message = this.config.message.statusException;
      /**
       * If UnAuthorized
       * Else If Server Error
       */
      switch (error.status) {
        case 400:
        case 401:
          this.logout();
          break;
        case 500:
          message = this.config.message.serverException;
      }
      // Backend returns unsuccessful response codes such as 404, 500 etc.
      this.statusMessage(error, date);
    } else {
      // A client-side or network error occurred.
      this.commonMessage(error, date);
      message = this.config.message.appException;
    }
    this.errorMSG(message);
  }

  /**
   * Logout of system
   */
  logout(message?: string) {
    toastr.error(this.config.message.unAuthenticated);
    if (message) {
      toastr.error(message);
    }
    setTimeout(() => {
      window.location.replace(this.config.logout);
    }, 5000);
  }

  /**
   * Show Error Message
   */
  errorMSG(message, code = null) {
    toastr.error(message, code);
  }
  /**
   * Log Error Message
   */
  statusMessage(error, date = new Date()) {
    console.error(
      '--------------------------------------------\n',
      'Backend returned status code: ' + error.status + '\n',
      'Response body ehandler:' + error.message + '\n',
      date + '\n',
      '--------------------------------------------'
    );
      this.hook.exceptionNotify(error.message, '----HTTP Error----');
  }

  /**
   * Log Common Error
   */
  commonMessage(error, date = new Date()) {
    console.error(
      '--------------------------------------------\n',
      'An error occurred ehandler:' + error.message + '\n',
      date + '\n',
      '--------------------------------------------'
    );
    this.hook.exceptionNotify(error.message, '----Common Error----');
  }
}
