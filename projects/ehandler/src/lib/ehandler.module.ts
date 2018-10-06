import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {Config} from './const/config';
import {EIntercepterService} from './eintercepter.service';
import {EHandlerService} from './ehandler.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HookService} from './hook.service';

export const InitialConfig: Config = {
  message: {
    unAuthenticated: 'Xahiş olunur sistemə daxil olun!',
    statusException: 'Status xətası',
    serverException: 'Server xətası',
    appException: 'Sistem xətası'
  },
  logout: '/logout',
  logoutCodes: [
    401,  // Bu ünvana icazəniz yoxdur
    1005, // You are not allowed to request this resource
    1006, // Token tapılmadı
    1014, // Token tapılmadı, zəhmət olmasa sistemə yenidən daxil olun
    1015, // Sizin sistemlərdən istifədə hüququnuz yoxdur
    1016, // Sizin bu sistemə istifədə hüququnuz yoxdur
    1017, // Sessiya bağlanmışdır, zəhmət olmasa sistemə yenidən daxil olun.
    1401, // Sessiya müddəti bitmişdir, zəhmət olmazsa sistemə yenidən daxil olun
    // 1402  // Sizin bu servisə icazəniz yoxdur
  ],
  hook: 'https://hooks.slack.com/services/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',
}

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: EHandlerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EIntercepterService,
      multi: true
    },
    HookService
  ],
  declarations: [],
  exports: []
})
export class EHandlerModule {
  static forRoot(configurations = InitialConfig): ModuleWithProviders {
    return {
      ngModule: EHandlerModule,
      providers: [
        {provide: 'configurations', useValue: configurations},
      ],
    };
  }
  static forChild(): ModuleWithProviders {

    return{
      ngModule: EHandlerModule,
    };

  }

}
