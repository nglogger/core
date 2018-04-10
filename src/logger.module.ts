'use strict';
/* Imports */
import { Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';

import { Logger, TRANSPORTS } from './logger.service';
import { Transport } from './transport';


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
          deps: [Injector],
          useFactory(injector: Injector) {
            return transports.map((t) => injector.get(t));
          }
        }
      ]
    };
  }
}
