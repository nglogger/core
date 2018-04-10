'use strict';
/* Imports */
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { Logger, TRANSPORTS } from './logger.service';
import { Transport } from './transport';


export function transportsFactory(...transports: Transport[]): Transport[] {
  return transports;
}


@NgModule({
  providers: [
    Logger,
    {
      provide: TRANSPORTS,
      useValue: []
    }
  ]
})
export class LoggerModule { // tslint:disable-line:no-unnecessary-class
  static forRoot(transports: Array<Type<Transport>>): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        Logger,
        {
          provide: TRANSPORTS,
          deps: transports,
          useFactory: transportsFactory
        }
      ]
    };
  }
}
