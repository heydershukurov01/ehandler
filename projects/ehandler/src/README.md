# EHANDLER
**EHANDLER** is an Angular library for exception handling. Toastr and jQuery is required for user side exception UI. The goal is to create a simple core library that makes exception handling nice and easy.

## Current Version
0.2.0

## Install

#### [npm](https://www.npmjs.com/package/ehandler)
```
npm install --save ehandler
```

## Description
The package is 
  - Handler for in app crashes (errors)
  - HTTP call exceptions
  - Built in crash reporter
  - Exception logger
  - Built in error logger via UI element 

## Usage
All in one handler is very eazy to use
In your app.module.ts (bootstrap module)
```
import {EHandlerModule} from 'ehandler';
```
```
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EHandlerModule.forRoot(
      {
        message: {
            unAuthenticated: 'Please login',
            statusException: 'Status Error',
            serverException: 'Server Error',
            appException: 'System Error'
          },
        logout: '/logout',
        logoutCodes: [401],
        hook: 'https://hooks.slack.com/services/{your slack hook hash}',
      }
    )
  ]
})
```

## Configurations
### Message (message)
  - unAuthenticated: The message will be shown to user when the status code of HTTP call is unauthorised
  - statusException: If unhandled status code occured while making HTTP call
  - serverException: Server did not responde to request
  - appException:    Exception occured in Application
  
### Logout (logout)
Logout uri to redirect

### Logout Codes (logoutCodes)
Array of status codes for detecting unauthorized user

### Hook (hook)
Url API for Slack hook;
App will send error data to slack

## Support
Tested in Chrome , Firefox , IE 9-11 , Edge , Safari

## Copyright
Copyright © 2018

