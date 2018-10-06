import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from './const/config';
import {catchError, map} from 'rxjs/operators';

@Injectable()

export class HookService {
  constructor(private http: HttpClient, @Inject('configurations') private config: Config) {}
  private bugged: boolean;
  /**
   * Send Message
   */
  sendMessage(payload: any) {
    this.http.post(this.config.hook, payload, {observe: 'response', responseType: 'text'}).subscribe( response => {
      console.info('Message sent');
    });
  }

  /**
   *  Send Exception to hook
   */
  exceptionNotify(error, couse = '') {
    const status = error.status ? error.status : 'Application Error';
    /**
     * Error Payload
     */
    const payload = {
      text: '--------------------------[ ' + status + ' ]--------------------------',
      attachments: [
        {
          author_name: 'Cause: ' + couse + '\nURL: ' + window.location.href,
          title: 'Message: ' + error.message,
          text: 'Date: ' + new Date() + '\nUserAgent: ' + navigator.userAgent +
          '\n---------------------------------------------------------'
        }
      ]
    };
    if (!this.bugged) {
      const headers = new HttpHeaders({
        'Content-Type': 'text/plain'
      })
      this.http.post(this.config.hook, JSON.stringify(payload), {observe: 'response', responseType: 'text', headers})
        .pipe(
          catchError(e => {
            this.bugged = true;
            console.log('Hook stopped working');
            throw e;
          })
        )
        .subscribe( response => {
          console.log('Exception Sent');
        });
    }

  }
}
