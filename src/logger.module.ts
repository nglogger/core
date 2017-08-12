'use strict';
/** Imports */
import { NgModule, ModuleWithProviders, Injector } from '@angular/core';

import { Logger } from './logger.service';
import { Transport } from './transport';


/** Interfaces */
export interface ITransportStatic {
  new (...args: any[]): Transport;
}


@NgModule()
export class LoggerModule {
  static forRoot(transports: ITransportStatic[]): ModuleWithProviders {
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
