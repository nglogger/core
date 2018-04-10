'use strict';
/* Imports */
import { Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';

import { Logger } from './logger.service';
import { Transport } from './transport';


@NgModule()
export class LoggerModule { // tslint:disable-line:no-unnecessary-class
  static forRoot(transports: Array<Type<Transport>>): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: Logger,
          deps: [Injector],
          useFactory: (injector: Injector) => (
            new Logger(transports.map((t) => injector.get(t)))
          )
        }
      ]
    };
  }
}
